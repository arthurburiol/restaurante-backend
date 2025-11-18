import Usuario from "../model/UsuarioModel.js";

async function login(req, res) {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ error: "Envie usuário e senha." });
  }

  try {
    const user = await Usuario.findOne({ where: { usuario } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    if (user.senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    return res.json({
      message: "Login realizado com sucesso.",
      id: user.id,
      nome: user.nome,
      tipo: user.tipo
    });

  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}

export default { login };
