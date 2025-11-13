import ComandaItens from "../model/ComandaItensModel.js";

async function listar(req, res) {
  const respostaBanco = await ComandaItens.findAll();
  res.json(respostaBanco);
}

async function selecionar(req, res) {
  const id = req.params.id;
  const respostaBanco = await ComandaItens.findByPk(id);
  res.json(respostaBanco);
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

export default { listar, selecionar, inserir, alterar, excluir };
