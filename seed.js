const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');
const DBConnection = require("./config/dbConfig");
const pool = DBConnection.pool;
(async () => {
    // Function to seed Users table
    const seedUsers = async (accountTypeString) => {
        const userQueries = [];
        for (let i = 0; i < 100; i++) { // Adjust the range for the number of records
            const email = faker.internet.email();
            const password = faker.internet.password();
            const isLoggedIn = false;
            const accountType = accountTypeString;
            const createdAt = faker.date.past();
            const updatedAt = faker.date.recent();

            userQueries.push(
                pool.query(
                    `INSERT INTO "Users" (email, password, "isLoggedIn", "accountType", "createdAt", "updatedAt")
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                    [email, password, isLoggedIn, accountType, createdAt, updatedAt]
                )
            );
        }
        const results = await Promise.all(userQueries);
        return results.map(res => res.rows[0].id);
    };

    // Function to seed UserProfiles table
    const seedUserProfiles = async (userIds) => {
        const userProfileQueries = [];
        for (const userId of userIds) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const bio = faker.person.bio();
            const contactNumber = faker.phone.number();
            const avatar = faker.image.avatarLegacy();
            const createdAt = faker.date.past();
            const updatedAt = faker.date.recent();

            userProfileQueries.push(
                pool.query(
                    `INSERT INTO "UserProfiles" ("firstName", "lastName", bio, "contactNumber", avatar, "accountId", "createdAt", "updatedAt")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
                    [firstName, lastName, bio, contactNumber, avatar, userId, createdAt, updatedAt]
                )
            );
        }
        const results = await Promise.all(userProfileQueries);
        return results.map(res => res.rows[0].id);
    };

    // Function to seed PropertyListings table
    const seedPropertyListings = async (userProfileIds, agentProfileIds) => {
        const propertyListingQueries = [];
        for (let i = 0; i < 100; i++) { // Adjust the range for the number of records
            const title = faker.lorem.words(3);
            const description = faker.lorem.sentences(2);
            const propertyType = faker.helpers.arrayElement(['house', 'apartment', 'condo']);
            const location = faker.location.city();
            const views = faker.number.int(1000);
            const livingArea = faker.number.int({ min: 500, max: 5000 });
            const bedrooms = faker.number.int({ min: 1, max: 5 });
            const bathrooms = faker.number.int({ min: 1, max: 3 });
            const listPrice = faker.commerce.price({ min: 100000, max: 1000000, dec: 0 });
            const isAvailable = faker.datatype.boolean(0.75);
            const sellerProfileId = faker.helpers.arrayElement(userProfileIds);
            const agentProfileId = faker.helpers.arrayElement(agentProfileIds);
            const createdAt = new Date();
            const updatedAt = new Date();

            propertyListingQueries.push(
                pool.query(
                    `INSERT INTO "PropertyListings" (title, description, "propertyType", location, views, "livingArea", bedrooms, bathrooms, "listPrice", "isAvailable", "sellerProfileId", "agentProfileId", "createdAt", "updatedAt")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`,
                    [title, description, propertyType, location, views, livingArea, bedrooms, bathrooms, listPrice, isAvailable, sellerProfileId, agentProfileId, createdAt, updatedAt]
                )
            );
        }
        const results = await Promise.all(propertyListingQueries);
        return results.map(res => res.rows[0].id);
    };

    // Function to seed Reviews table
    const seedReviews = async (reviewerProfileIds, agentProfileIds) => {
        const reviewQueries = [];
        for (let i = 0; i < 200; i++) { // Adjust the range for the number of records
            const rating = faker.number.int({ min: 1, max: 5 });
            const reviewBody = faker.lorem.sentences(3);
            const reviewerProfileId = faker.helpers.arrayElement(reviewerProfileIds);
            const agentProfileId = faker.helpers.arrayElement(agentProfileIds);
            const createdAt = new Date();
            const updatedAt = new Date();

            reviewQueries.push(
                pool.query(
                    `INSERT INTO "Reviews" (rating, "reviewBody", "reviewerProfileId", "agentProfileId", "createdAt", "updatedAt")
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                    [rating, reviewBody, reviewerProfileId, agentProfileId, createdAt, updatedAt]
                )
            );
        }
        const results = await Promise.all(reviewQueries);
        return results.map(res => res.rows[0].id);
    };

    // Function to seed SavedListings table
    const seedSavedListings = async (buyerProfileIds, propertyListingIds) => {
        const savedListingQueries = [];
        for (let i = 0; i < 50; i++) { // Adjust the range for the number of records
            const propertyListingId = faker.helpers.arrayElement(propertyListingIds);
            const buyerProfileId = faker.helpers.arrayElement(buyerProfileIds);
            const createdAt = new Date();
            const updatedAt = new Date();

            savedListingQueries.push(
                pool.query(
                    `INSERT INTO "SavedListings" ("propertyListingId", "buyerProfileId", "createdAt", "updatedAt")
          VALUES ($1, $2, $3, $4) RETURNING id`,
                    [propertyListingId, buyerProfileId, createdAt, updatedAt]
                )
            );
        }
        await Promise.all(savedListingQueries);
    };

    try {
        // Seed Users and UserProfiles
        const buyerIds = await seedUsers("buyer");
        const buyerProfileIds = await seedUserProfiles(buyerIds);

        const sellerIds = await seedUsers("seller");
        const sellerProfileIds = await seedUserProfiles(sellerIds);

        const agentIds = await seedUsers("realestateagent");
        const agentProfileIds = await seedUserProfiles(agentIds);

        // Seed PropertyListings
        const propertyListingIds = await seedPropertyListings(sellerProfileIds, agentProfileIds);

        // Seed Reviews
        await seedReviews(sellerProfileIds, agentProfileIds);
        await seedReviews(buyerProfileIds, agentProfileIds);

        // Seed SavedListings
        await seedSavedListings(buyerProfileIds, propertyListingIds);

        console.log('Database seeding completed successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await pool.end();
    }
})();

