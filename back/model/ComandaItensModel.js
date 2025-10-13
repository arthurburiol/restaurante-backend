import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
  "comanda_itens",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    id_comanda: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    valor_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("PENDENTE", "PRONTO", "ENTREGUE", "CANCELADO"),
      allowNull: false,
      defaultValue: "PENDENTE",
    },

    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    tempo_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    tempo_atualizar: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
);
