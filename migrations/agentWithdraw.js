'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('agentWithdraw', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            order_code: {
                type: Sequelize.STRING(50),
            },
            phone: {
                type: Sequelize.STRING(20),
            },
            amount: {
                type: Sequelize.BIGINT,
            },
            full_name: {
                type: Sequelize.STRING(100),
            },
            name_bank: {
                type: Sequelize.STRING(100),
            },
            number_bank: {
                type: Sequelize.STRING(100),
            },
            status: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.STRING(50),
                defaultValue: Date.now(),
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.STRING(50),
                defaultValue: Date.now(),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('agentWithdraw');
    },
};
