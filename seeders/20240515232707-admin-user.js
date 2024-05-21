'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */

        // Insert a user into the Users table
        const users = await queryInterface.bulkInsert('Users', [
            {
                email: 'admin@gmail.com',
                password: '1234',
                isLoggedIn: false,
                accountType: 'systemadmin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], { returning: true });

        // Assuming users[0].id will have the id of the inserted user
        const userId = users[0].id;

        // Insert a user profile for the created user
        return queryInterface.bulkInsert('UserProfiles', [
            {
                firstName: 'John',
                lastName: 'Doe',
                bio: 'System administrator',
                contactNumber: '123-456-7890',
                avatar: 'https://i.pravatar.cc/150?u=12345',
                accountId: userId,
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
        // Delete UserProfile first to avoid foreign key constraint issues
        await queryInterface.bulkDelete('UserProfiles', null, {});

        // Delete User after UserProfile is deleted
        return queryInterface.bulkDelete('Users', null, {});
    }
};
