import Produtos from "../model/ProdutosModel.js";

async function listar(req, res) {
    const respostaBanco = await Produtos.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Produtos.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    const respostaBanco = await Produtos.create(req.body);
    res.json(respostaBanco);
}

async function excluir(req, res) {
    const idusuario = req.params.id;

    const respostaBanco = await Usuario.destroy({ where: { cpf } });
    res.json(respostaBanco);
}

export default { listar, selecionar, inserir, excluir,};


