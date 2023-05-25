'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        console.log('Message');
        await queryInterface.createTable('Messages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            content: {
                type: Sequelize.STRING(1000),
            },
            sender: {
                type: Sequelize.STRING(100),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Messages');
    },
};
