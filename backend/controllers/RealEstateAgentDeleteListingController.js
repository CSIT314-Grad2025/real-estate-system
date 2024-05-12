const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Real Estate Agent, I want to be able to delete a property listing
// so that I can remove properties that are no longer for sale.

class RealEstateAgentDeleteListingController {
    // Controller Method
    handleDeleteListing = async (req, res, next) => {
        const { listingID } = req.body;
        try {

            if (!listingID) {
                let err = new Error('Missing field(s): listingID');
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            await new PropertyListing().deletePropertyListing(listingID);

            // Response sent to boundary
            res.status(200).json({
                message: "Property listing deleted successfully"
            })

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = RealEstateAgentDeleteListingController;
