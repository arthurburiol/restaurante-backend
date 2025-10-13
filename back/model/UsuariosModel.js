import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cpf: {
      type: DataTypes.STRING(14), 
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(15), 
      allowNull: false,
    },
  },
);
