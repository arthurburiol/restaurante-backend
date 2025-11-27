import Usuario from "../model/UsuarioModel.js";
import usuarios_sessoes from "../model/UsuariosSessoesModel.js";
import bcrypt from "bcryptjs";

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
  try {
    let { usuario, senha, cpf, nome, telefone, tipo } = req.body;

    if (!usuario || !senha)
      return res.status(422).json({ erro: "Usuário e senha são obrigatórios." });

    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const novo = await Usuario.create({
      usuario,
      senha: senhaHash,
      cpf: cpf || null,
      nome: nome || null,
      telefone: telefone || null,
      tipo: tipo || "CLIENTE"
    });
    res.status(200).json(novo);

  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
}

async function alterar(req, res) {
  try {
    const { usuario, nome, cpf, telefone, tipo, senha } = req.body;

    let dados = { usuario, nome, cpf, telefone, tipo };

    
    if (senha && senha.trim() !== "") {
      dados.senha = await bcrypt.hash(senha, 10);
    }

    await Usuario.update(dados, {
      where: { id: req.params.id }
    });

    return res.status(200).json({ mensagem: "Usuário alterado com sucesso!" });
  } catch (err) {
    console.log("Erro ao alterar usuário:", err);
    return res.status(500).json({ erro: "Erro interno ao alterar usuário" });
  }
}

async function excluir(req, res) {
  const id = req.params.id;
  const resposta = await Usuario.destroy({ where: { id } });
  res.json(resposta);
}

async function definirSenha(req, res) {
  const id = req.usuario_id;
  const { senha } = req.body;

  if (!senha || senha.length < 6 || senha.length > 20)
    return res.status(422).send("A senha deve ter entre 6 e 20 caracteres.");

  const usuario = await Usuario.findByPk(id);  // <-- CORRIGIDO
  if (!usuario) return res.status(404).send("Usuário não encontrado.");

  const senhaHash = await bcrypt.hash(senha, 10);
  await usuario.update({ senha: senhaHash });

  res.json({ message: "Senha alterada com sucesso." });
}



async function validarToken(req, res, next) {
  const token = req.headers.token;

  if (!token)
    return res.status(401).send("Token é obrigatório.");

  const sessao = await usuarios_sessoes.findOne({ where: { token } });

  if (!sessao)
    return res.status(401).send("Token inválido.");

  const agora = new Date();
  if (sessao.expires_at < agora) {
    await sessao.destroy();
    return res.status(401).send("Sessão expirada.");
  }

  req.usuario_id = sessao.usuario_id;

  next();
}

export default { listar, selecionar, inserir, alterar, excluir, definirSenha, validarToken };
