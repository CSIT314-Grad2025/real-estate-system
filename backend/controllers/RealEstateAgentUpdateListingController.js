const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Real Estate Agent, I want to update the information of the properties I have listed
// so that the information is up to date.

class RealEstateAgentUpdateListingController {
    // Controller Method
    handleUpdateListing = async (req, res, next) => {
        const { listingID } = req.body;
        try {

            if (!listingID) {
                let err = new Error('Missing field(s): listingID');
                err.status = 400;
                throw err;
            }


            // CREATE UPDATED LISTING OBJECT
            let updatedListing = new PropertyListing();

            // updatedListing.title = title
            // updatedListing.description = title

            // Entity Method Call
            await new PropertyListing().updatePropertyListing(listingID);

            // Response sent to boundary
            res.status(200).json({
                message: "Property listing updated successfully"
            })

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = RealEstateAgentUpdateListingController;
