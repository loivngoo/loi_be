'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

    async up(queryInterface, Sequelize) {

         await queryInterface.bulkInsert('Users', [
             {
                 phone: '0969000000',
                 username: 'superadmin1',
                 password_v1: '$2b$10$IoKC0Gf4I/J7YyXiIOK5oe/jZhVqMnObq/UOm2Zdwy9NtqWOLgcPq',
                 money: 999999999,
                 invite: '0000000000',
                 refferer: '0000000000',
                 role: 1,
                 name_store: ' MAKE MONEY NOT FRIENDS.',
                 ip_address: '',
                 status: 1,
                 id: 1
             },
])
        //     {
        //         phone: '0969111111',
        //         username: 'agentadmin1',
        //         password_v1: '$2b$10$IoKC0Gf4I/J7YyXiIOK5oe/jZhVqMnObq/UOm2Zdwy9NtqWOLgcPq',
        //         money: 111111111,
        //         invite: '1111111111',
        //         refferer: '1111111111',
        //         role: 2,
        //         name_store: 'DRUGS AND MATER.',
        //         ip_address: '',
        //         status: 1,
        //         id: 2
        //     },
        // ]);



        // await queryInterface.bulkInsert('Users', [

        //     {
        //         phone: '0969222223',
        //         username: 'customer4',
        //         password_v1: '$2b$10$IoKC0Gf4I/J7YyXiIOK5oe/jZhVqMnObq/UOm2Zdwy9NtqWOLgcPq',
        //         money: 650000000,
        //         invite: '1111111111',
        //         refferer: '1111111111',
        //         role: 1,
        //         name_store: 'LAPTOP STORE',
        //         ip_address: '',
        //         status: 1,
        //         agent_id: 2
        //     },
        //     {
        //         phone: '0969222223',
        //         username: 'customer3',
        //         password_v1: '$2b$10$IoKC0Gf4I/J7YyXiIOK5oe/jZhVqMnObq/UOm2Zdwy9NtqWOLgcPq',
        //         money: 40000000,
        //         invite: '1111111111',
        //         refferer: '1111111111',
        //         role: 1,
        //         name_store: 'COOK STORE',
        //         ip_address: '',
        //         status: 1,
        //         agent_id: 2
        //     },
        //     {
        //         phone: '0969222222',
        //         username: 'customer2',
        //         password_v1: '$2b$10$IoKC0Gf4I/J7YyXiIOK5oe/jZhVqMnObq/UOm2Zdwy9NtqWOLgcPq',
        //         money: 750000000,
        //         invite: '1111111111',
        //         refferer: '1111111111',
        //         role: 1,
        //         name_store: 'JEWELRY STORE',
        //         ip_address: '',
        //         status: 1,
        //         agent_id: 2

        //     },
        //     {
        //         phone: '0969222221',
        //         username: 'customer1',
        //         password_v1: '$2b$10$IoKC0Gf4I/J7YyXiIOK5oe/jZhVqMnObq/UOm2Zdwy9NtqWOLgcPq',
        //         money: 950000000,
        //         invite: '1111111111',
        //         refferer: '1111111111',
        //         role: 1,
        //         name_store: 'LUXURY STORE',
        //         ip_address: '',
        //         status: 1,
        //         agent_id: 2
        //     },
        // ])

        // return queryInterface.bulkInsert('Settings', [
        //     {
        //         name_bank: 'MB BANK',
        //         number_bank: '08001481954920',
        //         full_name: 'NGUYEN MANH LINH',
        //         wallet_usdt: '0xb4d926E849092aB0b6D6F24fD1Adb9C9B56A6497',
        //         link_support: 'https://t.me/abcxyz',
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //     },
        // ]);
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
