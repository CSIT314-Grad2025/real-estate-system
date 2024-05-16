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
            let err = new Error("User Profile not found");
            err.status = 404;
            throw err;
        }

        const profile = dbResponse.rows[0];

        // Instantiate new UserAccount object (Object creation step)
        let userProfile = new UserProfile();
        userProfile.id = profile.id;
        userProfile.firstName = profile.firstName;
        userProfile.lastName = profile.lastName;
        userProfile.bio = profile.bio;
        userProfile.contactNumber = profile.contactNumber;
        userProfile.avatar = profile.avatar;
        userProfile.accountId = profile.accountId;

        // Return UserAccount object
        return userProfile;
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
}

module.exports = UserProfile;
