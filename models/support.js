'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Support extends Model {
        static associate(models) {
            Support.hasOne(models.Conversation, {
                foreignKey: 'support_id',
            });
        }
    }
    Support.init(
        {
            status: {
                type: DataTypes.STRING,
                enum: ['pending', 'processing', 'done'],
            },
            service: {
                type: DataTypes.STRING,
                enum: ['deposit', 'withdraw', 'shopping', 'forgotPassword'],
            },
            user: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Support',
        },
    );

    return Support;
};
