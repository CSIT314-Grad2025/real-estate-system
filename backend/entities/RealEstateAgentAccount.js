const DBConnection = require("../../config/dbConfig");
const UserAccount = require("./UserAccount");

class RealEstateAgentAccount extends UserAccount{
    numberOfRatings;
    ratingSum;

    constructor() {
        super()
    }

    async getAccount(email) {

        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT sa.*, u.* FROM "Agents" sa
            INNER JOIN
            "Users" u ON sa."userId" = u.id
            WHERE 
            u.email = '${email}'`);

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const user = dbResponse.rows[0];


        // Instantiate new RealEstateAgentCredentials object (Object creation step)
        let newRealEstateAgentAccount = new RealEstateAgentAccount();
        newRealEstateAgentAccount.userId = user.userId;
        newRealEstateAgentAccount.firstName = user.firstName;
        newRealEstateAgentAccount.lastName = user.lastName;
        newRealEstateAgentAccount.email = user.email;
        newRealEstateAgentAccount.password = user.password;
        newRealEstateAgentAccount.isLoggedIn = user.isLoggedIn;

        // Return RealEstateAgentCredentials object
        return newRealEstateAgentAccount;
    }

    async getAccountById(userId) {

        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT sa.*, u.* FROM "Agents" sa
            INNER JOIN
            "Users" u ON sa."userId" = u.id
            WHERE 
            u.id = '${userId}'`);

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const user = dbResponse.rows[0];


        // Instantiate new RealEstateAgentCredentials object (Object creation step)
        let newRealEstateAgentAccount = new RealEstateAgentAccount();
        newRealEstateAgentAccount.userId = user.userId;
        newRealEstateAgentAccount.firstName = user.firstName;
        newRealEstateAgentAccount.lastName = user.lastName;
        newRealEstateAgentAccount.email = user.email;
        newRealEstateAgentAccount.password = user.password;
        newRealEstateAgentAccount.isLoggedIn = user.isLoggedIn;

        // Return RealEstateAgentCredentials object
        return newRealEstateAgentAccount;
    }

    async createAccount(firstName, lastName, email, password) {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `WITH rows AS(
            INSERT INTO "Users" ("firstName", "lastName", "email", "password", "createdAt", "updatedAt")
            VALUES('${firstName}', '${lastName}', '${email}', '${password}', NOW(), NOW())
            RETURNING id
            )

            INSERT INTO "RealEstateAgents" ("userId", "createdAt", "updatedAt")
            SELECT id, NOW(), NOW()
            FROM rows`
        );
    }

    async getAllAccounts() {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT u.*, r.* FROM "RealEstateAgents" r
            LEFT JOIN "Users" u
            ON r."userId" = u.id`
        );

        return dbResponse.rows;
    }

    async setLoggedIn() {
        // Database Connection worker
        const pool = DBConnection.pool;

        await pool.query(
            `UPDATE "Users"
            SET "isLoggedIn" = true
            WHERE "id" = ${this.userId}`
        )
    }

    async setLoggedOut() {
        // Database Connection worker
        const pool = DBConnection.pool;

        await pool.query(
            `UPDATE "Users"
            SET "isLoggedIn" = false
            WHERE "id" = '${this.userId}'`
        )
    }

    // Increment the numberOfRatings by one and add the rating to ratingSum
    async updateRating() {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT u.*, r.* FROM "RealEstateAgents" r
            LEFT JOIN "Users" u
            ON r."userId" = u.id`
        );

        return dbResponse.rows;
    }
}

module.exports = RealEstateAgentAccount;
