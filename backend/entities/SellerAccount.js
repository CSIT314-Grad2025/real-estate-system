const DBConnection = require("../../config/dbConfig");
const UserAccount = require("./UserAccount");

class SellerAccount extends UserAccount {

    constructor() {
        super();
    }

    async getAccount(email) {

        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT sa.*, u.* FROM "Sellers" sa
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


        // Instantiate new SellerCredentials object (Object creation step)
        let newSellerAccount = new SellerAccount();
        newSellerAccount.userId = user.userId;
        newSellerAccount.firstName = user.firstName;
        newSellerAccount.lastName = user.lastName;
        newSellerAccount.email = user.email;
        newSellerAccount.password = user.password;
        newSellerAccount.isLoggedIn = user.isLoggedIn;

        // Return SellerCredentials object
        return newSellerAccount;
    }

    async getAccountById(userId) {

        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT sa.*, u.* FROM "Sellers" sa
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


        // Instantiate new SellerCredentials object (Object creation step)
        let newSellerAccount = new SellerAccount();
        newSellerAccount.userId = user.userId;
        newSellerAccount.firstName = user.firstName;
        newSellerAccount.lastName = user.lastName;
        newSellerAccount.email = user.email;
        newSellerAccount.password = user.password;
        newSellerAccount.isLoggedIn = user.isLoggedIn;

        // Return SellerCredentials object
        return newSellerAccount;
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

module.exports = SellerAccount;
