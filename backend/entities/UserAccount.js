const DBConnection = require("../../config/dbConfig");

// @Entity
// Represents a user account
// Responsible for authentication and authorization

// This model stores essential information for user authentication, such as username,
// email, password, and account status. It provides methods for authenticating users,
// managing passwords, and controlling account status.

class UserAccount {
    id;
    email;
    password;
    isLoggedIn;
    accountType;

    async login(email, password, accountType) {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "Users"
            WHERE 
            email = '${email}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User Not Found");
            err.status = 404;
            throw err;
        }

        const user = dbResponse.rows[0];

        // Validate Credentials
        if (password != user.password) {
            let err = new Error("Incorrect Password");
            err.status = 400;
            throw err;
        }

        // Validate AccountType
        if (accountType != user.accountType) {
            let err = new Error("Account Type Mismatch");
            err.status = 400;
            throw err;
        }

        // Instantiate new UserAccount (Object creation step)
        let userAccount = new UserAccount();
        userAccount.id = user.id;
        userAccount.email = user.email;
        userAccount.password = user.password;
        userAccount.isLoggedIn = user.isLoggedIn;
        userAccount.accountType = user.accountType;


        // Persist login
        await userAccount.setLoggedIn();

        // Return UserAccount object
        return userAccount;
    }


    async getAccount(email) {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "Users"
            WHERE email = '${email}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const user = dbResponse.rows[0];

        // Instantiate new UserAccount object (Object creation step)
        let userAccount = new UserAccount();
        userAccount.userId = user.id;
        userAccount.firstName = user.firstName;
        userAccount.lastName = user.lastName;
        userAccount.email = user.email;
        userAccount.password = user.password;
        userAccount.isLoggedIn = user.isLoggedIn;

        // Return UserAccount object
        return userAccount;
    }

    async getAccountById(id) {
        // Database Connection worker
        const pool = DBConnection.pool;
        const dbResponse = await pool.query(
            `SELECT * FROM "Users"
            WHERE id = '${id}'`
        );

        // Query
        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const user = dbResponse.rows[0];


        // Instantiate new UserAccount object (Object creation step)
        let userAccount = new UserAccount();
        userAccount.id = user.id;
        userAccount.firstName = user.firstName;
        userAccount.lastName = user.lastName;
        userAccount.email = user.email;
        userAccount.password = user.password;
        userAccount.contactNumber = user.contactNumber;
        userAccount.isLoggedIn = user.isLoggedIn;
        userAccount.accountType = user.accountType;

        // Return UserAccount object
        return userAccount;
    }

    async createAccount(email, password, accountType) {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Validation
        const VALID_TYPES = [
            "systemadmin",
            "buyer",
            "seller",
            "realestateagent",
        ]

        if (!VALID_TYPES.includes(accountType)) {
            let err = new Error("Invalid Account Type");
            err.status = 400;
            throw err;
        }

        // Query
        await pool.query(
            `
            INSERT INTO "Users" ("email", "password", "accountType", "isLoggedIn", "createdAt", "updatedAt")
            VALUES('${email}', '${password}', '${accountType}', false, NOW(), NOW())
            `
        );
    }


    async setLoggedIn() {
        // Database Connection worker
        const pool = DBConnection.pool;

        await pool.query(
            `UPDATE "Users"
            SET "isLoggedIn" = true
            WHERE "id" = ${this.id}`
        )
    }

    async setLoggedOut() {
        // Database Connection worker
        const pool = DBConnection.pool;

        await pool.query(
            `UPDATE "Users"
            SET "isLoggedIn" = false
            WHERE "id" = '${this.id}'`
        )
    }


    async updateAccount() {
        // Database Connection worker
        const pool = DBConnection.pool;

        let setClause = "";

        let comma = "";

        this.firstName && (setClause += `${comma}"firstName" = '${this.firstName}'`) && (comma = ",");
        this.lastName && (setClause += `${comma}"lastName" = '${this.lastName}'`) && (comma = ",");
        this.password && (setClause += `${comma}"password" = '${this.password}'`) && (comma = ",");

        if (setClause.length == 0) {
            let err = new Error('No valid field changes');
            err.status = 400;
            throw err;
        }
        // Query
        let dbResponse = await pool.query(
            `UPDATE "Users"
            SET ${setClause}
            WHERE email = '${this.email}'`
        )

        if (dbResponse.rowCount < 1) {
            let err = new Error('User not found');
            err.status = 400;
            throw err;
        }
    }

    async deleteAccount(email) {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        let dbResponse = await pool.query(
            `DELETE FROM "Users"
            WHERE email = '${email}'`
        )

        if (dbResponse.rowCount < 1) {
            let err = new Error('User not found');
            err.status = 400;
            throw err;
        }

    }

}

module.exports = UserAccount;
