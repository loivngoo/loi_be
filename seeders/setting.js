'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {
                phone: '0123456789',
                username: 'admin@123456',
                password_v1: '$2b$10$IoKC0Gf4I/J7YyXiIOK5oe/jZhVqMnObq/UOm2Zdwy9NtqWOLgcPq',
                money: 9999999999,
                invite: '123456780',
                refferer: '123456780',
                role: 1,
                name_store: 'Admin Admin 123',
                ip_address: '1912.168.1.1',
                status: 1,
            },
            {
                phone: '0123456788',
                username: 'admin@654321',
                password_v1: '$2b$10$IoKC0Gf4I/J7YyXiIOK5oe/jZhVqMnObq/UOm2Zdwy9NtqWOLgcPq',
                money: 9999999999,
                invite: '123456780',
                refferer: '123456780',
                role: 0,
                name_store: 'Admin User 321',
                ip_address: '1912.168.1.1',
                status: 1,
            },
        ]);
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
