import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
  'comandas',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    cpf_usuario: {
      type: DataTypes.STRING(14),
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'cpf'
      }
    },

    data_abertura: {
      type: DataTypes.DATE,
      allowNull: false
    },

    data_fechamento: {
      type: DataTypes.DATE,
      allowNull: true
    },

    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },

    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    }
  }
);
