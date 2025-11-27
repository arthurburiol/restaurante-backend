import Usuario from "../model/UsuarioModel.js";
import usuarios_sessoes from "../model/UsuariosSessoesModel.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize"; 



async function limparSessoesExpiradas() {
  try {
    const agora = new Date();
    await usuarios_sessoes.destroy({
      where: { expires_at: { [Op.lt]: agora } },
    });
  } catch (error) {
    console.error("Erro limpando sessões:", error);
  }
}

async function login(req, res) {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha)
      return res.status(400).send("Usuário e senha são obrigatórios.");

    const UsuarioBanco = await Usuario.findOne({ where: { usuario } });

    if (!UsuarioBanco)
      return res.status(404).send("Usuário ou senha inválidos.");

    const senhaValida = await bcrypt.compare(senha, UsuarioBanco.senha);
    if (!senhaValida)
      return res.status(404).send("Usuário ou senha inválidos.");

    const token = uuidv4();

    const agora = new Date();
    const expira = new Date(agora.getTime() + 2 * 60 * 60 * 1000);

    await usuarios_sessoes.create({
      usuario_id: UsuarioBanco.id,
      token,
      device:  "Mobile",
      created_at: agora,
      expires_at: expira,
    });

    limparSessoesExpiradas();

    res.status(200).send({
      token,
     token,
      usuario: {
        id: UsuarioBanco.id,
        nome: UsuarioBanco.nome,
        telefone: UsuarioBanco.telefone,
        usuario: UsuarioBanco.usuario,
        cpf: UsuarioBanco.cpf,
        tipo: UsuarioBanco.tipo ,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).send("Erro no login.");
  }
}

export default { login };