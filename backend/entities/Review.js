class Review {
    id;
    reviewTitle;
    reviewBody;
    reviewerID;
    rating;
    agentID;

    constructor() {
        this.id = null;
        this.reviewTitle = null;
        this.reviewBody = null;
        this.reviewerID = null;
        this.rating = null;
        this.agentID = null;
    }

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
        console.log(review);
        return review;
    }

    getReviewsByAgentID = async (id) => {
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

    getReviewsByReviewerID = async (id) => {
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

    createReview = async (reviewTitle, reviewBody, reviewerID, rating, agentID) => {
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

    updateReview = async (id, review) => {
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
