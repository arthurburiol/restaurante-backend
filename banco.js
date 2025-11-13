import { Sequelize } from "sequelize";

const sequelize = new Sequelize('restaurante', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect:'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default sequelize;