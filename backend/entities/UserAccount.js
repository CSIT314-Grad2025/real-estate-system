const DBConnection = require("../../config/dbConfig");

class UserAccount {
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
        this.isLoggedIn = null;
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
        console.log(user);

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

        if(dbResponse.rowCount < 1) {
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

        if(dbResponse.rowCount < 1) {
            let err = new Error('User not found');
            err.status = 400;
            throw err;
        }

    }

}

module.exports = UserAccount;
