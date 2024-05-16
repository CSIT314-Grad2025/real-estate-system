const DBConnection = require("../../config/dbConfig");
const UserAccount = require("./UserAccount");

class SystemAdminAccount extends UserAccount {
    contactNumber;

    constructor() {
        super()
        this.contactNumber = null;
    }

    async getAccount(email) {

        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT sa.*, u.* FROM "SystemAdmins" sa
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


        // Instantiate new SystemAdminCredentials object (Object creation step)
        let newSystemAdminAccount = new SystemAdminAccount();
        newSystemAdminAccount.userId = user.userId;
        newSystemAdminAccount.firstName = user.firstName;
        newSystemAdminAccount.lastName = user.lastName;
        newSystemAdminAccount.email = user.email;
        newSystemAdminAccount.password = user.password;
        newSystemAdminAccount.contactNumber = user.contactNumber;
        newSystemAdminAccount.isLoggedIn = user.isLoggedIn;

        // Return SystemAdminCredentials object
        return newSystemAdminAccount;
    }

    async getAccountById(id) {

        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "Users"
            WHERE id = ${id}
            `);

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const user = dbResponse.rows[0];


        // Instantiate new SystemAdminCredentials object (Object creation step)
        let newSystemAdminAccount = new SystemAdminAccount();
        newSystemAdminAccount.userId = user.userId;
        newSystemAdminAccount.firstName = user.firstName;
        newSystemAdminAccount.lastName = user.lastName;
        newSystemAdminAccount.email = user.email;
        newSystemAdminAccount.password = user.password;
        newSystemAdminAccount.contactNumber = user.contactNumber;
        newSystemAdminAccount.isLoggedIn = user.isLoggedIn;

        // Return SystemAdminCredentials object
        return newSystemAdminAccount;
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

module.exports = SystemAdminAccount;
