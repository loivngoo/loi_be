'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Settings', [
            {
                name_bank: 'MB BANK',
                number_bank: '08001481954920',
                full_name: 'NGUYEN VAN LINH',
                wallet_usdt: '0xb4d926E849092aB0b6D6F24fD1Adb9C9B56A6497',
                link_support: 'https://t.me/abcxyz',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
