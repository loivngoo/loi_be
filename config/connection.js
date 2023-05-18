require('dotenv').config();
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATA_DB, process.env.DATA_USER, process.env.DATA_PASS, {
    host: process.env.DATA_HOST,
    dialect: 'mysql',
    logging: false,
    define: {
        raw: true,
    },
});

export default sequelize;
