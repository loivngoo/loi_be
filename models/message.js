'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.Conversation, {
                foreignKey: 'conversation_id',
                as: 'conversation',
            });
        }
    }
    Message.init(
        {
            content: DataTypes.STRING,
            sender: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Message',
        },
    );

    return Message;
};
