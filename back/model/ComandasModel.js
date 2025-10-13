import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
  "comandas",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    cpf_usuario: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    data_abertura: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },

    data_fechamento: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("ABERTA", "FECHADA", "CANCELADA"), // define os possíveis valores
      allowNull: false,
      defaultValue: "ABERTA",
    },

    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      defaultValue: 0,
    },
  },
);
