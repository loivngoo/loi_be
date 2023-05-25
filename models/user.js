'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            phone: DataTypes.STRING,
            username: DataTypes.STRING,
            password_v1: DataTypes.STRING,
            money: DataTypes.BIGINT,
            invite: DataTypes.STRING,
            refferer: DataTypes.STRING,
            role: DataTypes.INTEGER,
            name_store: DataTypes.STRING,
            ip_address: DataTypes.STRING,
            status: DataTypes.INTEGER,
            agent_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
