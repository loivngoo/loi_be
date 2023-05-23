'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        console.log('eventSale');
        await queryInterface.createTable('eventSales', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            agent_id: {
                type: Sequelize.BIGINT,
            },
            percent_sale: {
                type: Sequelize.INTEGER,
            },
            created_at: {
                type: Sequelize.DATE,
            },
            expried_at: {
                type: Sequelize.DATE,
            },
            listProductType: {
                type: Sequelize.STRING(1000),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('eventSales');
    },
};