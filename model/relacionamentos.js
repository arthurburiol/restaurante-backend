import ComandaItens from "./ComandaItensModel.js";
import Comanda from "./ComandaModel.js";
import Produto from "./ProdutosModel.js";
import Usuario from "./UsuarioModel.js";

// ===============================
// ComandaItens → Produto
// ===============================
ComandaItens.belongsTo(Produto, {
  foreignKey: "id_produto"
});
Produto.hasMany(ComandaItens, {
  foreignKey: "id_produto"
});

// ===============================
// ComandaItens → Comanda
// ===============================
ComandaItens.belongsTo(Comanda, {
  foreignKey: "id_comanda"
});
Comanda.hasMany(ComandaItens, {
  foreignKey: "id_comanda"
});

// ===============================
// Comanda → Usuario
// (cpf_usuario → cpf)
// ===============================
Comanda.belongsTo(Usuario, {
  foreignKey: "cpf_usuario",
  targetKey: "cpf"
});
Usuario.hasMany(Comanda, {
  foreignKey: "cpf_usuario",
  sourceKey: "cpf"
});

export default {
  ComandaItens,
  Comanda,
  Produto,
  Usuario
};
