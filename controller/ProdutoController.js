import Produto from "../model/ProdutosModel.js";
import { Op } from "sequelize";

async function listar(req, res) {
  const respostaBanco = await Produto.findAll();
  res.json(respostaBanco);
}

async function selecionar(req, res) {
  const id = req.params.id;
  const respostaBanco = await Produto.findByPk(id);
  res.json(respostaBanco);
}

async function selecionarPorIds(req, res) {
  try {
    // Espera receber um array de ids no body
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "Envie um array de ids" });
    }

    const produtos = await Produto.findAll({
      where: {
        id: { [Op.in]: ids }
      }
    });

    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
}

async function inserir(req, res) {
  const respostaBanco = await Produto.create(req.body);
  res.json(respostaBanco);
}

async function alterar(req, res) {
  const id = req.params.id;
  const { nome, descricao, preco, tipo, disponivel } = req.body;

  const respostaBanco = await Produto.update(
    { nome, descricao, preco, tipo, disponivel },
    { where: { id } }
  );
  res.json(respostaBanco);
}

async function excluir(req, res) {
  const id = req.params.id;
  const respostaBanco = await Produto.destroy({ where: { id } });
  res.json(respostaBanco);
}

export default { listar, selecionar, selecionarPorIds, inserir, alterar, excluir };
