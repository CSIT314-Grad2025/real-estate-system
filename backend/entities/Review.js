const DBConnection = require("../../config/dbConfig");
const UserAccount = require("./UserAccount");
const UserProfile = require("./UserProfile");

class Review {
    id;
    reviewerProfileId;
    agentProfileId;
    reviewBody;
    rating;

    getReviewByID = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "Reviews"
            WHERE id = '${id}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("Review not found");
            err.status = 404;
            throw err;
        }

        const review = dbResponse.rows[0];
        return review;
    }

    getReviewsByAgentProfileId = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "Reviews"
            WHERE "agentProfileId" = '${id}'`
        );

        const reviews = dbResponse.rows;
        return reviews;
    }

    getReviewsByReviewerProfileId = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "Reviews"
            WHERE "reviewerProfileId" = '${id}'`
        );

        const review = dbResponse.rows;
        return review;
    }

    createReview = async (rating, reviewBody, reviewerProfileId, agentProfileId) => {
        // Database Connection worker
        const pool = DBConnection.pool;
        reviewBody = reviewBody || '';
        try {
            const reviewerProfile = await new UserProfile().getUserProfile(reviewerProfileId);
            const reviewerAccount = await new UserAccount().getAccountById(reviewerProfile.accountId);
            if (reviewerAccount.accountType != 'seller' && reviewerAccount.accountType != 'buyer') {
                console.log(reviewerAccount)
                let err = new Error("Reviewer is not a Seller or a Buyer");
                err.status = 400;
                throw err;
            }

            const agentProfile = await new UserProfile().getUserProfile(agentProfileId);
            const agentAccount = await new UserAccount().getAccountById(agentProfile.accountId);
            if (agentAccount.accountType != 'realestateagent') {
                let err = new Error("AgentId supplied is not an Agent");
                err.status = 400;
                throw err;
            }

            await pool.query(
                `
            INSERT INTO "Reviews" (
                "rating", "reviewBody", "reviewerProfileId", "agentProfileId", 
                "createdAt", "updatedAt"
            )
            VALUES(
                '${rating}', '${reviewBody}', '${reviewerProfileId}', '${agentProfileId}',
                NOW(), NOW()
            )`);

        } catch (e) {
            console.log(e.code);
            if (e.code == 23503) {
                let err = new Error("User Profile Not Found");
                err.status = 400;
                throw err;
            }
            throw (e);
        }
    }

    updateReview = async (id, reviewBody) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "Reviews"
            WHERE id = '${id}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("Review not found");
            err.status = 404;
            throw err;
        }

        const review = dbResponse.rows[0];
        return review;
    }

    deleteReview = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "Reviews"
            WHERE id = '${id}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("Review not found");
            err.status = 404;
            throw err;
        }

        const review = dbResponse.rows[0];
        console.log(review);
        return review;
    }
}

module.exports = Review;
