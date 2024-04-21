const DBConnection = require("../../config/dbConfig");

class BuyerAccount {
    userId;
    firstName;
    lastName;
    email;
    password;
    isLoggedIn;

    constructor() {
        this.userId = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.password = null;
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
        newBuyerAccount.contactNumber = user.contactNumber;
        newBuyerAccount.isLoggedIn = user.isLoggedIn;

        // Return BuyerCredentials object
        return newBuyerAccount;
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

}

module.exports = BuyerAccount;
