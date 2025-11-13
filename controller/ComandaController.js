import Comanda from "../model/ComandaModel.js";

async function listar(req, res) {
  const respostaBanco = await Comanda.findAll();
  res.json(respostaBanco);
}

async function selecionar(req, res) {
  const id = req.params.id;
  const respostaBanco = await Comanda.findByPk(id);
  res.json(respostaBanco);
}

async function inserir(req, res) {
  const respostaBanco = await Comanda.create(req.body);
  res.json(respostaBanco);
}

async function alterar(req, res) {
  const id = req.params.id;
  const { cpf_usuario, data_abertura, data_fechamento, status, total } = req.body;

  const respostaBanco = await Comanda.update(
    { cpf_usuario, data_abertura, data_fechamento, status, total },
    { where: { id } }
  );
  res.json(respostaBanco);
}

async function excluir(req, res) {
  const id = req.params.id;
  const respostaBanco = await Comanda.destroy({ where: { id } });
  res.json(respostaBanco);
}

export default { listar, selecionar, inserir, alterar, excluir };
