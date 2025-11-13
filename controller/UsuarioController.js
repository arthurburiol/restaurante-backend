import Usuario from "../model/UsuarioModel.js";

async function listar(req, res) {
  const lista = await Usuario.findAll();
  res.json(lista);
}

async function selecionar(req, res) {
  const id = req.params.id;
  const usuario = await Usuario.findByPk(id);
  res.json(usuario);
}

async function inserir(req, res) {
  const novo = await Usuario.create(req.body);
  res.json(novo);
}

async function alterar(req, res) {
  const id = req.params.id;
  const { cpf, nome, telefone, tipo } = req.body;

  const resposta = await Usuario.update(
    { cpf, nome, telefone, tipo },
    { where: { id } }
  );

  res.json(resposta);
}

async function excluir(req, res) {
  const id = req.params.id;
  const resposta = await Usuario.destroy({ where: { id } });
  res.json(resposta);
}

export default { listar, selecionar, inserir, alterar, excluir };
