const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Buyer I want to view the new property listings so that I can
// see the available properties and find that match my preferences.

class BuyerSearchNewListingsController {
    // Controller Method
    handleSearchNewListings = async (req, res, next) => {
        try {

            if (req.requestingUser.accountType != "buyer") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            let listings = await new PropertyListing().getAllPropertyListings();

            // Reduce to available listings
            let newListings = listings.filter(listing => listing.isAvailable);

            // Array of listings sent to boundary
            res.status(200).json({
                newListings
            })

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = BuyerSearchNewListingsController;
