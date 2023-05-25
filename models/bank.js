'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bank extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Bank.init(
        {
            phone: DataTypes.STRING,
            full_name: DataTypes.STRING,
            name_bank: DataTypes.STRING,
            number_bank: DataTypes.STRING,
            wallet_usdt: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Bank',
        },
    );
    return Bank;
};
