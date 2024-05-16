class SavedListing {
    id;
    buyerID;
    propertyListingID;
    timeSavedAt;

    constructor() {
        this.id = null;
        this.buyerID = null;
        this.propertyListingID = null;
        this.timeSavedAt = null;
    }

    getSavedListingById = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "SavedListing"
            WHERE id = '${id}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("Listing not found");
            err.status = 404;
            throw err;
        }

        const savedListing = dbResponse.rows[0];
        return savedListing;
    }

    getSavedListingsByBuyer = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "SavedListing"
            WHERE "buyerID" = '${id}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("No saved listings found");
            err.status = 404;
            throw err;
        }

        const savedListings = dbResponse.rows;
        return savedListings;
    }

    getSavedListingsByProperty = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "SavedListing"
            WHERE "propertyListingID" = '${id}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("No saved listings found");
            err.status = 404;
            throw err;
        }

        const savedListings = dbResponse.rows;
        return savedListings;
    }


    createSavedListing = async (buyerID, propertyListingID) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `INSERT INTO "Reviews"('buyerID', 'propertyListingID')
            VALUES (${buyerID}, ${propertyListingID})`
        );
    }

    deleteSavedListing = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        await pool.query(
            `DELETE FROM "Reviews"
            WHERE id = '${id}'`
        );
    }
}

module.exports = SavedListing;
