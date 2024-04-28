const DBConnection = require("../../config/dbConfig");
const UserAccount = require("./UserAccount");

class BuyerAccount extends UserAccount {

    constructor() {
        super()
    }

    async getAccount(email) {

        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT sa.*, u.* FROM "Buyers" sa
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


        // Instantiate new BuyerCredentials object (Object creation step)
        let newBuyerAccount = new BuyerAccount();
        newBuyerAccount.userId = user.userId;
        newBuyerAccount.firstName = user.firstName;
        newBuyerAccount.lastName = user.lastName;
        newBuyerAccount.email = user.email;
        newBuyerAccount.password = user.password;
        newBuyerAccount.isLoggedIn = user.isLoggedIn;

        // Return BuyerCredentials object
        return newBuyerAccount;
    }

    async getAccountById(userId) {

        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT sa.*, u.* FROM "Buyers" sa
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


        // Instantiate new BuyerCredentials object (Object creation step)
        let newBuyerAccount = new BuyerAccount();
        newBuyerAccount.userId = user.userId;
        newBuyerAccount.firstName = user.firstName;
        newBuyerAccount.lastName = user.lastName;
        newBuyerAccount.email = user.email;
        newBuyerAccount.password = user.password;
        newBuyerAccount.isLoggedIn = user.isLoggedIn;

        // Return BuyerCredentials object
        return newBuyerAccount;
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

            INSERT INTO "Buyers" ("userId", "createdAt", "updatedAt")
            SELECT id, NOW(), NOW()
            FROM rows`
        );
    }

    async getAllAccounts() {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT u.*, b.* FROM "Buyers" b
            LEFT JOIN "Users" u
            ON b."userId" = u.id`
        );

        return dbResponse.rows;
    }

    // INSERT INTO "Buyers" ("userId")
    // SELECT id FROM inserted_user)`
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
            SET 
            "isLoggedIn" = ${this.isLoggedIn},
            ""
            WHERE "id" = '${this.userId}'`
        );
    }
}

module.exports = BuyerAccount;
