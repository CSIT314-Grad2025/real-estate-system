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
            const { propertyListingID, buyerID } = req.body;

            const requiredFields = ['propertyListingID', 'buyerID'];
            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                const missingFieldNames = missingFields.join(', ');
                const errorMessage = `Missing Field(s): ${missingFieldNames}`;
                let err = new Error(errorMessage);
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            new SavedListing().createSavedListing(buyerID, propertyListingID);

            // Response sent to Boundary
            res.status(201).json({
                message: "Listing saved successfully"
            });

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = BuyerSaveListingController;
