'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        console.log('SUpport');
        await queryInterface.createTable('Supports', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            status: {
                type: Sequelize.STRING(50),
                defaultValue: 'pending',
            },
            service: {
                type: Sequelize.STRING(50),
            },
            user: {
                type: Sequelize.STRING(200),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Supports');
    },
};
