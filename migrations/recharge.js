'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Recharges', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            phone: {
                type: Sequelize.STRING(20),
            },
            order_code: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            amount: {
                type: Sequelize.BIGINT,
                allowNull: true,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
        await queryInterface.dropTable('Recharges');
    },
};
