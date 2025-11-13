import Pagamento from "../model/PagamentosModel.js";

async function listar(req, res) {
  const respostaBanco = await Pagamento.findAll();
  res.json(respostaBanco);
}

async function selecionar(req, res) {
  const id = req.params.id;
  const respostaBanco = await Pagamento.findByPk(id);
  res.json(respostaBanco);
}

async function inserir(req, res) {
  const respostaBanco = await Pagamento.create(req.body);
  res.json(respostaBanco);
}

async function alterar(req, res) {
  const id = req.params.id;
  const { id_comanda, valor, forma_pagamento, hora_pagamento } = req.body;

  const respostaBanco = await Pagamento.update(
    { id_comanda, valor, forma_pagamento, hora_pagamento },
    { where: { id } }
  );
  res.json(respostaBanco);
}

async function excluir(req, res) {
  const id = req.params.id;
  const respostaBanco = await Pagamento.destroy({ where: { id } });
  res.json(respostaBanco);
}

export default { listar, selecionar, inserir, alterar, excluir };
