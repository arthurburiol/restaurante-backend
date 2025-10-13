import Usuarios from "../model/UsuarioModel.js";

async function listar(req, res) {
    const respostaBanco = await Usuarios.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Usuarios.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    const respostaBanco = await Usuarios.create(req.body);
    res.json(respostaBanco);
}


async function excluir(req, res) {
    const idusuario = req.params.id;

    const respostaBanco = await Usuarios.destroy({ where: { cpf } });
    res.json(respostaBanco);
}

export default { listar, selecionar, inserir, excluir,};


