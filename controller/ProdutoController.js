import Produto from "../model/ProdutosModel.js";

async function listar(req, res) {
  const respostaBanco = await Produto.findAll();
  res.json(respostaBanco);
}

async function selecionar(req, res) {
  const id = req.params.id;
  const respostaBanco = await Produto.findByPk(id);
  res.json(respostaBanco);
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

export default { listar, selecionar, inserir, alterar, excluir };
