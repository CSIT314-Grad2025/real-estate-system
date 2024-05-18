const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Real Estate Agent, I want to view the properties that I have listed
// to keep track of my record.

class RealEstateAgentViewMyListingsController {
    // Controller Method
    handleViewListings = async (req, res, next) => {
        try {
            // Checking if user is authorized
            if (req.requestingUser.accountType != "realestateagent") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Parse seller profile id from request
            const id = req.profileId;
            if (!id) {
                let err = new Error('Missing Field: profileId');
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            let listings = await new PropertyListing().getPropertyListingsByAgent(id);

            // Array of listings sent to Boundary
            res.status(200).json({
                listings
            })
        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }

}
module.exports = RealEstateAgentViewMyListingsController;
