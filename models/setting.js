'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Setting extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Setting.init(
        {
            full_name: DataTypes.STRING,
            name_bank: DataTypes.STRING,
            number_bank: DataTypes.BIGINT,
            wallet_usdt: DataTypes.STRING,
            link_support: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Setting',
        },
    );
    return Setting;
};
