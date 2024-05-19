const SavedListing = require("../entities/SavedListing.js");


class BuyerViewSavedListingController {
    // Controller Method
    handleViewSavedListings = async (req, res, next) => {
        try {
            // Checking if user is authorized
            if (req.requestingUser.accountType != "buyer") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            const buyerProfileId = req.profileId;

            // Entity Method Call
            let savedListings = await new SavedListing().getSavedListingsByBuyer(buyerProfileId);

            // Response sent to Boundary
            res.status(201).json({
                savedListings
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = BuyerViewSavedListingController;
