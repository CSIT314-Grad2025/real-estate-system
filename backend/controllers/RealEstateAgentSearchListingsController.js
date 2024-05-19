const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Real Estate Agent, I want to search other property listings
// to keep track of the market.

class RealEstateAgentSearchListingsController {
    // Controller Method
    handleSearchListings = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "realestateagent") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }
            const listings = await new PropertyListing().getAllPropertyListings();

            res.status(200).json({ listings });
        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = RealEstateAgentSearchListingsController;
