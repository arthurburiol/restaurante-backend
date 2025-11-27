import ComandaItens from "../model/ComandaItensModel.js";
import Produto from "../model/ProdutosModel.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";

// RELATÓRIO: vendas por itens do dia
async function vendasPorItens(req, res) {
  try {
    const itens = await ComandaItens.findAll({
      attributes: [
        [Sequelize.col("produto.nome"), "nome"],
        [Sequelize.fn("SUM", Sequelize.col("quantidade")), "quantidade_vendida"],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal("quantidade * valor_unitario")
          ),
          "total_faturado"
        ]
      ],
      include: [
        {
          model: Produto,
          attributes: [] // não precisa repetir campos, já estamos pegando nome acima
        }
      ],
      where: Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("tempo_pedido")),
        "=",
        Sequelize.literal("CURRENT_DATE")
      ),
      group: ["produto.nome"],
      order: [[Sequelize.literal("total_faturado"), "DESC"]]
    });

    res.json(itens);

  } catch (erro) {
    console.error("Erro ao gerar relatório:", erro);
    res.status(500).json({ erro: "Erro ao gerar relatório" });
  }
}

// Relatório total do dia
async function valorTotalDoDia(req, res) {
  try {
    const resultado = await ComandaItens.findOne({
      attributes: [
        [
          Sequelize.fn("SUM", Sequelize.literal("quantidade * valor_unitario")),
          "total_do_dia"
        ]
      ],
      where: Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("tempo_pedido")),
        "=",
        Sequelize.literal("CURRENT_DATE")
      )
    });

    res.json(resultado);

  } catch (erro) {
    console.error("Erro ao calcular total do dia:", erro);
    res.status(500).json({ erro: "Erro ao calcular total do dia" });
  }
}

async function vendasPorItensPeriodo(req, res) {
  try {
    const { data_inicio, data_fim } = req.body;

    const itens = await ComandaItens.findAll({
      attributes: [
        [Sequelize.col("produto.nome"), "nome"],
        [Sequelize.fn("SUM", Sequelize.col("quantidade")), "quantidade_vendida"],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal("quantidade * valor_unitario")
          ),
          "total_faturado"
        ]
      ],
      include: [
        {
          model: Produto,
          attributes: []
        }
      ],
      where: {
        tempo_pedido: {
          [Op.between]: [data_inicio + " 00:00:00", data_fim + " 23:59:59"]
        }
      },
      group: ["produto.nome"],
      order: [[Sequelize.literal("total_faturado"), "DESC"]]
    });

    res.json(itens);

  } catch (erro) {
    console.error("Erro ao gerar relatório:", erro);
    res.status(500).json({ erro: "Erro ao gerar relatório" });
  }
}

async function valorTotalDoPeriodo(req, res) {
  try {
    const { data_inicio, data_fim } = req.body;

    const total = await ComandaItens.findOne({
      attributes: [
        [
          Sequelize.fn("SUM", Sequelize.literal("quantidade * valor_unitario")),
          "total_do_periodo"
        ]
      ],
      where: {
        tempo_pedido: { 
          [Op.between]: [data_inicio + " 00:00:00", data_fim + " 23:59:59"]
        }
      }
    });

    res.json(total);

  } catch (erro) {
    console.error("Erro ao calcular total do período:", erro);
    res.status(500).json({ erro: "Erro ao calcular total do período" });
  }
}

export default { vendasPorItens, valorTotalDoDia, vendasPorItensPeriodo, valorTotalDoPeriodo};
