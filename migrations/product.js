'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        console.log('Product');
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            product_name: {
                type: Sequelize.STRING(1000),
            },
            product_type: {
                type: Sequelize.INTEGER,
            },
            full_price: {
                type: Sequelize.BIGINT,
            },
            image_path: {
                type: Sequelize.STRING(1000),
            },
            description: {
                type: Sequelize.STRING(1000),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Products');
    },
};
