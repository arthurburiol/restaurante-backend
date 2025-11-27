import { Sequelize } from "sequelize";

const sequelize = new Sequelize('restaurante', 'postgres', 'postgres', {
    host: 'database-restaurantedosguri.cdikyooqq0rc.sa-east-1.rds.amazonaws.com',
    port: 5432,
    dialect:'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default sequelize;
//B1u2TMhR9q9nQGZFLaFbT4qd