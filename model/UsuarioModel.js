import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
  'usuarios',  // Corrija o nome da tabela para 'usuarios'
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true // Garantir que o campo 'usuario' seja único
    },

    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    cpf: {
      type: DataTypes.STRING(11), // Supondo que seja um CPF
      allowNull: true
    },

    nome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    telefone: {
      type: DataTypes.STRING(15), // Supondo que seja um telefone com DDD
      allowNull: true
    },

    tipo: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }
);
