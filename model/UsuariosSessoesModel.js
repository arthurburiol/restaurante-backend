// model/UsuariosSessoesModel.js
import { DataTypes } from "sequelize";
import sequelize from '../banco.js'; // seu arquivo de conexão

const usuarios_sessoes = sequelize.define("usuarios_sessoes", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // device: {
    //     type: DataTypes.STRING
    // },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: "usuarios_sessoes",
    timestamps: false
});

export default usuarios_sessoes;
