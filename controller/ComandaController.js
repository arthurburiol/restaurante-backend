import Comanda from "../model/ComandaModel.js";
import Usuario from "../model/UsuarioModel.js";



async function listarComandaAberta(req, res) {
  try {

    const usuarioLogado = await Usuario.findByPk(req.usuario_id);
    if (!usuarioLogado) return res.status(404).json({ erro: "Usuário não encontrado." });

    // Se for CLIENTE, filtra apenas suas comandas
    const filtroComanda = {
      status: "ABERTA" // 🔥 AQUI É O FILTRO PRINCIPAL
    };
    if (usuarioLogado.tipo === "CLIENTE") {
      filtroComanda.cpf_usuario = usuarioLogado.cpf;
    }

    const comandas = await Comanda.findAll({
      where: filtroComanda,
      include: [
        {
          model: Usuario,
          attributes: ["nome", "cpf"]
        }
      ],
      order: [["id", "ASC"]]
    });

    res.json(comandas);
  } catch (error) {
    console.error("Erro ao listar comandas:", error);
    res.status(500).json({ erro: "Erro ao listar comandas." });
  }
}

async function listarComandaFechada(req, res) {
  try {
    // Identifica o usuário logado
    const usuarioLogado = await Usuario.findByPk(req.usuario_id);
    if (!usuarioLogado) return res.status(404).json({ erro: "Usuário não encontrado." });

    // Se for CLIENTE, filtra apenas suas comandas
     const filtroComanda = {
      status: "FECHADA" // 🔥 AQUI É O FILTRO PRINCIPAL
    };
    if (usuarioLogado.tipo === "CLIENTE") {
      filtroComanda.cpf_usuario = usuarioLogado.cpf;
    }

    const comandas = await Comanda.findAll({
      where: filtroComanda,
      include: [
        {
          model: Usuario,
          attributes: ["nome", "cpf"]
        }
      ], 
      order: [["id", "ASC"]]
    });
    res.json(comandas);
  } catch (error) {
    console.error("Erro ao listar comandas fechadas:", error);
    res.status(500).json({ erro: "Erro ao listar comandas fechadas." });
  }
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

export default {listarComandaAberta, listarComandaFechada, selecionar, inserir, alterar, excluir };
