import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
  'produtos',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING(150),
      allowNull: false
    },

    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    disponivel: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }
);
