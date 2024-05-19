const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Real Estate Agent, I want to be able to delete a property listing
// so that I can remove properties that are no longer for sale.

class RealEstateAgentDeleteListingController {
    // Controller Method
    handleDeleteListing = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "realestateagent") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            let id = parseInt(req.params.id);
            if (!id) {
                let err = isNaN(id) ? new Error('Invalid ID: ID must be an integer')
                    : new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            await new PropertyListing().deletePropertyListing(id);

            // Response sent to boundary
            res.status(200).json({
                message: "Property listing deleted successfully"
            })

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = RealEstateAgentDeleteListingController;
