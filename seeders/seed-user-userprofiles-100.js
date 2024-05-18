'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [];
        const userProfiles = [];

        for (let i = 0; i < 100; i++) {
            const user = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                isLoggedIn: faker.datatype.boolean(),
                accountType: faker.helpers.arrayElement(['systemadmin', 'user']),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            users.push(user);
        }

        const createdUsers = await queryInterface.bulkInsert('Users', users, { returning: true });

        for (const user of createdUsers) {
            const userProfile = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                bio: faker.person.bio(),
                contactNumber: faker.phone.number(),
                avatar: faker.image.avatar(),
                accountId: user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            userProfiles.push(userProfile);
        }

        return queryInterface.bulkInsert('UserProfiles', userProfiles);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserProfiles', null, {});
        return queryInterface.bulkDelete('Users', null, {});
    }
};
