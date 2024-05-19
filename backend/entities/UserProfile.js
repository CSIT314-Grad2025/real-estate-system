const DBConnection = require("../../config/dbConfig");

// @Entity
// Represents a user Profile in the Database

class UserProfile {
    id;
    firstName;
    lastName;
    bio;
    contactNumber;
    avatar;
    accountId;

    async getUserProfile(id) {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "UserProfiles"
            WHERE id = '${id}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User Profile Not Found");
            err.status = 404;
            throw err;
        }

        const profile = dbResponse.rows[0];

        // Instantiate new UserProfile object (Object creation step)
        let userProfile = new UserProfile();
        userProfile.id = profile.id;
        userProfile.firstName = profile.firstName;
        userProfile.lastName = profile.lastName;
        userProfile.bio = profile.bio;
        userProfile.contactNumber = profile.contactNumber;
        userProfile.avatar = profile.avatar;
        userProfile.accountId = profile.accountId;

        // Return UserProfile object
        return userProfile;
    }

    async getUserProfileByAccount(accountId) {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "UserProfiles"
            WHERE "accountId" = '${accountId}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User Profile Not Found");
            err.status = 404;
            throw err;
        }

        const profile = dbResponse.rows[0];

        // Instantiate new UserProfile object (Object creation step)
        let userProfile = new UserProfile();
        userProfile.id = profile.id;
        userProfile.firstName = profile.firstName;
        userProfile.lastName = profile.lastName;
        userProfile.bio = profile.bio;
        userProfile.contactNumber = profile.contactNumber;
        userProfile.avatar = profile.avatar;
        userProfile.accountId = profile.accountId;

        // Return UserProfile object
        return userProfile;
    }

    async getAllProfiles() {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "UserProfiles"`
        );

        const profiles = dbResponse.rows;

        let userProfiles = [];

        // Instantiate new UserProfile object (Object creation step)
        profiles.map((profile, _idx) => {
            let userProfile = new UserProfile();
            userProfile.id = profile.id;
            userProfile.firstName = profile.firstName;
            userProfile.lastName = profile.lastName;
            userProfile.bio = profile.bio;
            userProfile.contactNumber = profile.contactNumber;
            userProfile.avatar = profile.avatar;
            userProfile.accountId = profile.accountId;

            userProfiles.push(userProfile);
        })


        // Return Array of UserProfiles objects
        return userProfiles;
    }

    async getAllRealEstateAgentProfiles() {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `
            SELECT up.*
            FROM "UserProfiles" up
            JOIN "Users" u ON up."accountId" = u.id
            WHERE u."accountType" = 'realestateagent';
            `
        );

        const profiles = dbResponse.rows;

        let userProfiles = [];

        // Instantiate new UserProfile object (Object creation step)
        profiles.map((profile, _idx) => {
            let userProfile = new UserProfile();
            userProfile.id = profile.id;
            userProfile.firstName = profile.firstName;
            userProfile.lastName = profile.lastName;
            userProfile.bio = profile.bio;
            userProfile.contactNumber = profile.contactNumber;
            userProfile.avatar = profile.avatar;
            userProfile.accountId = profile.accountId;

            userProfiles.push(userProfile);
        })

        // Return Array of UserProfiles objects
        return userProfiles;
    }


    async createUserProfile(firstName, lastName, bio, contactNumber, avatar, accountId) {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        try {
            await pool.query(
                `
            INSERT INTO "UserProfiles" (
                "firstName", "lastName", "bio", "contactNumber", "avatar",
                "accountId", "createdAt", "updatedAt"
            )
            VALUES(
                '${firstName}', '${lastName}', '${bio}', '${contactNumber}', '${avatar}', '${accountId}', NOW(), NOW()
            )`
            );
        } catch (e) {
            console.log(e.code);
            if (e.code == 23503) {
                let err = new Error("User Account Not Found");
                err.status = 400;
                throw err;
            }
            if (e.code == 23505) {
                let err = new Error("User Profile already exists.");
                err.status = 400;
                throw err;
            }
            throw (e);
        }
    }

    async updateProfile() {
        // Database Connection worker
        const pool = DBConnection.pool;

        let setClause = "";

        let comma = "";

        this.firstName && (setClause += `${comma}"firstName" = '${this.firstName}'`) && (comma = ",");
        this.lastName && (setClause += `${comma}"lastName" = '${this.lastName}'`) && (comma = ",");
        this.bio && (setClause += `${comma}"bio" = '${this.bio}'`) && (comma = ",");
        this.contactNumber && (setClause += `${comma}"contactNumber" = '${this.contactNumber}'`) && (comma = ",");
        this.avatar && (setClause += `${comma}"avatar" = '${this.avatar}'`) && (comma = ",");

        if (setClause.length == 0) {
            let err = new Error('No valid field changes');
            err.status = 400;
            throw err;
        }
        // Query
        let dbResponse = await pool.query(
            `UPDATE "UserProfiles"
            SET ${setClause}
            WHERE id = '${this.id}'`
        )

        if (dbResponse.rowCount < 1) {
            let err = new Error('User Profile Not Found');
            err.status = 400;
            throw err;
        }
    }

    async deleteProfile(id) {
        console.log(id);
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        let dbResponse = await pool.query(
            `DELETE FROM "UserProfiles"
            WHERE id = ${id}`
        )

        if (dbResponse.rowCount < 1) {
            let err = new Error('User Profile Not Found');
            err.status = 400;
            throw err;
        }
    }
}

module.exports = UserProfile;
