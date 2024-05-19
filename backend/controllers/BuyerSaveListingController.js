const SavedListing = require("../entities/SavedListing.js");

// These two user stories should be combined, they do the same thing
// The view new/sold shortlist controllers are responsible for differentiating between new and sold saves,

// @UserStory
// As a buyer, I want to save the new property listings to a
// shortlist or favourite so that I can easily access them later and view again.

// @UserStore
// As a buyer, I want to save sold properties to favourite list,
// so that I can reference them later for comparison. 

class BuyerSaveListingController {
    // Controller Method
    handleSaveListing = async (req, res, next) => {
        try {
            // Checking if user is authorized
            if (req.requestingUser.accountType != "buyer") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            const propertyListingId = req.params.propertyListingId;
            const buyerProfileId = req.profileId;
            console.log({ propertyListingId, buyerProfileId })

            // Entity Method Call
            await new SavedListing().createSavedListing(buyerProfileId, propertyListingId);

            // Response sent to Boundary
            res.status(201).json({
                message: "Listing saved successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = BuyerSaveListingController;
