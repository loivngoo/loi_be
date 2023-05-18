'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Recharge extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Recharge.init(
        {
            phone: DataTypes.STRING,
            order_code: DataTypes.STRING,
            amount: DataTypes.STRING,
            status: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Recharge',
        },
    );
    return Recharge;
};
