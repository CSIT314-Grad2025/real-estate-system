const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Real Estate Agent, I want to view the properties that I have listed
// to keep track of my record.

class RealEstateAgentViewMyListingsController {
    // Controller Method
    handleViewListings = async (req, res, next) => {
        const { agentID } = req.body;
        try {

            if (!agentID) {
                let err = new Error('Missing field(s): agentID');
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            let listings = await new PropertyListing().getPropertyListingsByAgent(agentID);

            // Array of listings sent to Boundary
            res.status(200).json({
                listings
            })

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = RealEstateAgentViewMyListingsController;
