'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Settings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            full_name: {
                type: Sequelize.STRING(100),
            },
            name_bank: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            number_bank: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            wallet_usdt: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            link_support: {
                type: Sequelize.STRING(255),
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
        await queryInterface.dropTable('Settings');
    },
};
