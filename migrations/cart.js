'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        console.log('carts');
        await queryInterface.createTable('Carts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            product_id: {
                type: Sequelize.BIGINT,
            },
            product_type: {
                type: Sequelize.INTEGER,
            },
            full_price: {
                type: Sequelize.BIGINT,
            },
            sale_price: {
                type: Sequelize.BIGINT,
            },
            agent_id: {
                type: Sequelize.BIGINT,
            },
            event_id: {
                type: Sequelize.BIGINT,
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
            is_closed: {
                type: Sequelize.BOOLEAN
            },
            customer_id: {
                type: Sequelize.BIGINT,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Carts');
    },
};