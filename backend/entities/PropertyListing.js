class PropertyListing {
    // attributes
    id;
    title;
    listingAgentID;
    sellerID;

    description;
    propertyType;
    livingArea;
    numberOfBedrooms;
    numberOfBathrooms;

    listPrice;

    // Boolean to track if listing is sold
    available;

    // Methods
    getPropertyListingByID = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "PropertyListings"
            WHERE id = '${propertyID}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const propertyListing = dbResponse.rows[0];
        console.log(propertyListing);
        return propertyListing;
    }

    getPropertyListingsByAgent = async (listingAgentID) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "PropertyListings"
            WHERE id = '${propertyID}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const propertyListing = dbResponse.rows[0];
        console.log(propertyListing);
        return propertyListing;

    }

    getPropertyListingsBySeller = async (sellerID) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "PropertyListings"
            WHERE id = '${propertyID}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const propertyListing = dbResponse.rows[0];
        console.log(propertyListing);
        return propertyListing;

    }

    getAllPropertyListings = async () => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "PropertyListings"`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const propertyListing = dbResponse.rows;
        console.log(propertyListing);
        return propertyListing;
    }

    createPropertyListing = async (title, listingAgentID, sellerID, description, propertyType, livingArea, numberOfBedrooms, numberOfBathrooms, listPrice) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "PropertyListings"
            WHERE id = '${propertyID}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const propertyListing = dbResponse.rows[0];
        console.log(propertyListing);
        return propertyListing;

    }

    updatePropertyListing = async (id, propertyListing) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "PropertyListings"
            WHERE id = '${propertyID}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const propertyListing = dbResponse.rows[0];
        console.log(propertyListing);
    }

    deletePropertyListing = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "PropertyListings"
            WHERE id = '${propertyID}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const propertyListing = dbResponse.rows[0];
        console.log(propertyListing);
        return propertyListing;
    }
}

module.exports = PropertyListing;
