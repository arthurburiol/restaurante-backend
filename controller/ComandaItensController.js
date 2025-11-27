import ComandaItens from "../model/ComandaItensModel.js";
import Usuario from "../model/UsuarioModel.js";
import Comanda from "../model/ComandaModel.js";
import Produto from "../model/ProdutosModel.js";
import { Op } from "sequelize";

async function listar(req, res) {
  const respostaBanco = await ComandaItens.findAll();
  res.json(respostaBanco);
}

async function selecionar(req, res) {
  try {
    const id_comanda = req.params.id_comanda;

    const itens = await ComandaItens.findAll({
      where: { id_comanda: id_comanda },
      include: [
        {
          model: Produto,
          attributes: ["id", "nome", "descricao", "preco"],
        },
      ],
    });

    res.json(itens);
  } catch (error) {
    console.log("Erro ao buscar itens:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
}

async function listarBebidas(req, res) {
  try {
    const usuarioLogado = await Usuario.findByPk(req.usuario_id);
    if (!usuarioLogado) return res.status(404).json({ erro: "Usuário não encontrado." });

    const bebidas = await ComandaItens.findAll({
      where: {
        status: { [Op.or]: ["PENDENTE", "EM_EXECUCAO"] }
      },
      include: [
        {
          model: Produto,
          where: { tipo: "BEBIDA" },
          attributes: ["nome", "tipo", "preco"]
        },
        {
          model: Comanda,
          attributes: ["id", "status", "data_abertura"],
          where: usuarioLogado.tipo === "CLIENTE" ? { cpf_usuario: usuarioLogado.cpf } : undefined,
          include: [
            {
              model: Usuario,
              attributes: ["nome", "cpf"]
            }
          ]
        }
      ],
      order: [["id", "ASC"]]
    });

    res.json(bebidas);
  } catch (error) {
    console.log("Erro ao listar bebidas:", error);
    res.status(500).json({ erro: "Erro ao listar bebidas." });
  }
}

async function listarPratos(req, res) {
  try {
    const usuarioLogado = await Usuario.findByPk(req.usuario_id);
    if (!usuarioLogado) return res.status(404).json({ erro: "Usuário não encontrado." });

    const pratos = await ComandaItens.findAll({
      where: {
        status: { [Op.or]: ["PENDENTE", "EM_EXECUCAO"] }
      },
      include: [
        {
          model: Produto,
          where: { tipo: "PRATO" },
          attributes: ["nome", "tipo", "preco"]
        },
        {
          model: Comanda,
          attributes: ["id", "status", "data_abertura"],
          where: usuarioLogado.tipo === "CLIENTE" ? { cpf_usuario: usuarioLogado.cpf } : undefined,
          include: [
            {
              model: Usuario,
              attributes: ["nome", "cpf"]
            }
          ]
        }
      ],
      order: [["id", "ASC"]]
    });

    res.json(pratos);
  } catch (error) {
    console.log("Erro ao listar bebidas:", error);
    res.status(500).json({ erro: "Erro ao listar bebidas." });
  }
}

// Atualiza status de um item de comanda
async function alterarStatusItem(req, res) {
  try {
    const id = req.params.id; // id do comanda_itens
    const { status } = req.body; // status novo

    const item = await ComandaItens.findByPk(id);
    if (!item) return res.status(404).json({ erro: "Item não encontrado." });

    item.status = status;
    await item.save();

    res.json(item);
  } catch (error) {
    console.error("Erro ao alterar status:", error);
    res.status(500).json({ erro: "Não foi possível alterar o status." });
  }
}

// Recebe dados do pedido: cpf_usuario, total, lista de produtos
async function criarComanda(req, res) {
  try {
    const usuario_id = req.usuario_id; // vem do middleware validarToken
    const usuario = await Usuario.findByPk(usuario_id);

    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

    const { produtos } = req.body; // [{ id_produto, quantidade, valor_unitario }]

    const total = produtos.reduce(
      (acc, item) => acc + item.valor_unitario * item.quantidade,
      0
    );

    const comanda = await Comanda.create({
      cpf_usuario: usuario.cpf,
      data_abertura: new Date(),
      status: "ABERTA",
      total,
    });

    const itensCriados = [];
    for (const item of produtos) {
      const itemCriado = await ComandaItens.create({
        id_comanda: comanda.id,
        id_produto: item.id_produto,
        quantidade: item.quantidade,
        valor_unitario: item.valor_unitario,
        status: "PENDENTE",
      });
      itensCriados.push(itemCriado);
    }

return res.json({
  id_comanda: comanda.id,
  total: comanda.total,
  itens: itensCriados
});
  } catch (error) {
    console.error("Erro ao criar comanda:", error);
    return res.status(500).json({ erro: "Não foi possível criar a comanda." });
  }
}

async function inserir(req, res) {
  const respostaBanco = await ComandaItens.create(req.body);
  res.json(respostaBanco);
}

async function alterar(req, res) {
  const id = req.params.id;
  const { id_comanda, id_produto, quantidade, valor_unitario, status, data_fechamento } = req.body;

  const respostaBanco = await ComandaItens.update(
    { id_comanda, id_produto, quantidade, valor_unitario, status, data_fechamento },
    { where: { id } }
  );
  res.json(respostaBanco);
}

async function excluir(req, res) {
  const id = req.params.id;
  const respostaBanco = await ComandaItens.destroy({ where: { id } });
  res.json(respostaBanco);
}

export default { listar, selecionar, listarBebidas, listarPratos, alterarStatusItem, criarComanda, inserir, alterar, excluir };
