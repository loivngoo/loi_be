'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            phone: {
                type: Sequelize.STRING(20),
            },
            username: {
                type: Sequelize.STRING(100),
            },
            password_v1: {
                type: Sequelize.STRING,
            },
            money: {
                type: Sequelize.BIGINT,
                defaultValue: 0,
            },
            invite: {
                type: Sequelize.STRING(20),
            },
            refferer: {
                type: Sequelize.STRING(20),
            },
            role: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            name_store: {
                type: Sequelize.STRING(150),
            },
            ip_address: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
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
        await queryInterface.dropTable('Users');
    },
};
