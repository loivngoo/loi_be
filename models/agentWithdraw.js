'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class agentWithdraw extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    agentWithdraw.init(
        {
            order_code: DataTypes.STRING,
            phone: DataTypes.STRING,
            amount: DataTypes.BIGINT,
            full_name: DataTypes.STRING,
            name_bank: DataTypes.STRING,
            number_bank: DataTypes.STRING,
            status: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'agentWithdraw',
            tableName: 'agentWithdraw'
        },
    );
    return agentWithdraw;
};
