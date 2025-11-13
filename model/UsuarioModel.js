import { DataTypes } from "sequelize";
import banco from "../banco.js";

const Usuario = banco.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cpf: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  },
  {
    timestamps: false, // teu banco não usa createdAt/updatedAt
    tableName: "usuarios"
  }
);

export default Usuario;
