const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Real Estate Agent, I want to search other property listings
// to keep track of the market.

class RealEstateAgentSearchListingsController {
    // Controller Method
    handleSearchListings = async (req, res, next) => {
        const { listingID } = req.body;
        try {

            if (!listingID) {
                let err = new Error('Missing field(s): listingID');
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            let listings = await new PropertyListing().getAllPropertyListings();

            // Array of listings sent to boundary
            res.status(200).json({
                listings
            })

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = RealEstateAgentSearchListingsController;
