const UserProfile = require("./UserProfile");
const UserAccount = require("./UserAccount");
const DBConnection = require("../../config/dbConfig");

class PropertyListing {
    // attributes
    id;
    title;
    agentProfileId;
    sellerProfileId;
    description;
    propertyType;
    livingArea;
    bedrooms;
    bathrooms;
    listPrice;
    location;
    // Boolean to track if listing is sold
    isAvailable;

    views;

    // Methods
    getPropertyListingByID = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "PropertyListings"
            WHERE id = '${id}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("Property Listing not found");
            err.status = 404;
            throw err;
        }

        const propertyListing = dbResponse.rows[0];
        return propertyListing;
    }

    getPropertyListingsByAgent = async (agentProfileId) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "PropertyListings"
            WHERE "agentProfileId" = '${agentProfileId}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("Property Listing not found");
            err.status = 404;
            throw err;
        }

        const propertyListings = dbResponse.rows;
        return propertyListings;
    }

    getPropertyListingsBySeller = async (sellerProfileId) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `SELECT * FROM "PropertyListings"
            WHERE "sellerProfileId" = '${sellerProfileId}'`
        );

        if (dbResponse.rows.length == 0) {
            let err = new Error("No Property Listings found.");
            err.status = 404;
            throw err;
        }

        const propertyListings = dbResponse.rows;
        return propertyListings;
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

    createPropertyListing = async (
        title, description, propertyType, livingArea, bedrooms, bathrooms,
        listPrice, isAvailable, sellerEmail, agentProfileId, location,
    ) => {
        // Database Connection worker
        const pool = DBConnection.pool;
        try {

            // Validate seller and agent types
            const sellerAccount = await new UserAccount().getAccountByEmail(sellerEmail);
            const sellerProfile = await new UserProfile().getUserProfileByAccount(sellerAccount.id);
            if (sellerAccount.accountType != 'seller') {
                let err = new Error("SellerId supplied is not a seller");
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

            // Query
            await pool.query(
                `
            INSERT INTO "PropertyListings" (
                "title", "description", "propertyType", "livingArea", "bedrooms",
                "bathrooms", "listPrice", "isAvailable", "sellerProfileId", "agentProfileId", "location", "views",
                "createdAt", "updatedAt"
            )
            VALUES(
                '${title}', '${description}', '${propertyType}', '${livingArea}', '${bedrooms}',
                '${bathrooms}', '${listPrice}', '${isAvailable}', '${sellerProfile.id}', '${agentProfileId}', '${location}', 0,
                NOW(), NOW()
            )`
            );
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

    updatePropertyListing = async (propertyListing) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Verify the requesting real estate agent is also the creator of the listing
        const propertyListingOriginal = await new PropertyListing().getPropertyListingByID(this.id)
        if (propertyListingOriginal.agentProfileId != this.agentProfileId) {
            let err = new Error('Unauthorized: Requesting owner is not the owner of this listing');
            err.status = 400;
            throw err;
        }

        let setClause = "";
        let comma = "";

        this.title && (setClause += `${comma}"title" = '${this.title}'`) && (comma = ",");
        this.description && (setClause += `${comma}"description" = '${this.description}'`) && (comma = ",");
        this.propertyType && (setClause += `${comma}"propertyType" = '${this.propertyType}'`) && (comma = ",");
        this.livingArea && (setClause += `${comma}"livingArea" = '${this.livingArea}'`) && (comma = ",");
        this.bedrooms && (setClause += `${comma}"bedrooms" = '${this.bedrooms}'`) && (comma = ",");
        this.bathrooms && (setClause += `${comma}"bathrooms" = '${this.bathrooms}'`) && (comma = ",");
        this.listPrice && (setClause += `${comma}"listPrice" = '${this.listPrice}'`) && (comma = ",");
        this.isAvailable && (setClause += `${comma}"isAvailable" = '${this.isAvailable}'`) && (comma = ",");
        this.location && (setClause += `${comma}"location" = '${this.location}'`) && (comma = ",");
        this.views && (setClause += `${comma}"views" = '${this.views}'`) && (comma = ",");

        if (setClause.length == 0) {
            let err = new Error('No valid field changes');
            err.status = 400;
            throw err;
        }

        // Query
        let dbResponse = await pool.query(
            `UPDATE "PropertyListings"
            SET ${setClause}
            WHERE id = '${this.id}'`
        )

        if (dbResponse.rowCount < 1) {
            let err = new Error("Property Listing not found");
            err.status = 404;
            throw err;
        }
    }

    incrementViews = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `UPDATE "PropertyListings"
            SET views = views + 1
            WHERE id = '${id}'`
        );

        if (dbResponse.rowCount < 1) {
            let err = new Error("Property Listing not found");
            err.status = 404;
            throw err;
        }
    }

    calculateMortgage = async (id, interestRate, loanTermYears) => {
        // Calculate mortgage
        let propertyListing = await this.getPropertyListingByID(id);
        
        let propertyPrice = propertyListing.listPrice;
        const monthlyInterestRate = interestRate / 100 / 12;
        const totalPayments = loanTermYears * 12;
        const mortgage = propertyPrice * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
            (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

        return(mortgage);
    }

    deletePropertyListing = async (id) => {
        // Database Connection worker
        const pool = DBConnection.pool;

        // Query
        const dbResponse = await pool.query(
            `DELETE FROM "PropertyListings"
            WHERE id = '${id}'`
        );

        if (dbResponse.rowCount < 1) {
            let err = new Error("Property Listing not found");
            err.status = 404;
            throw err;
        }
    }
}

module.exports = PropertyListing;
