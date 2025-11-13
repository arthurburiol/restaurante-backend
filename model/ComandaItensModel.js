import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
  'comanda_itens',
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
        model: 'comandas',
        key: 'id'
      }
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'produtos',
        key: 'id'
      }
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    valor_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'PENDENTE'
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tempo_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    tempo_atualizacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'comanda_itens',
    timestamps: false
  }
);
