import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
  'pagamentos',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    id_comanda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comanda',
        key: 'id'
      }
    },

    valor: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },

    forma_pagamento: {
      type: DataTypes.STRING(50),
      allowNull: true
    },

    hora_pagamento: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }
);
