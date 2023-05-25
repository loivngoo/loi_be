'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Conversation extends Model {
        static associate(models) {
            Conversation.hasMany(models.Message, {
                foreignKey: 'conversation_id',
                as: 'messages',
            });

            Conversation.belongsTo(models.Support, {
                foreignKey: 'support_id',
            });
        }
    }
    Conversation.init(
        {
            conversation_name: DataTypes.STRING,
            sender: DataTypes.STRING,
            receiver: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Conversation',
        },
    );

    return Conversation;
};
