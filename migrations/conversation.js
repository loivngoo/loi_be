'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        console.log('Conversation');
        try {
            await queryInterface.createTable('Conversations', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.BIGINT,
                },
                conversation_name: {
                    type: Sequelize.STRING(100),
                },
                sender: {
                    type: Sequelize.STRING(200),
                },
                receiver: {
                    type: Sequelize.STRING(200),
                },
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Conversations');
    },
};
