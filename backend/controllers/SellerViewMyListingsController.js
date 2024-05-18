const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As A Seller I want to be able to view all of my listed properties, so that I can
// know their status at a glance

class SellerViewMyListingsController {
    // Controller Method
    handleViewListings = async (req, res, next) => {
        try {
            // Checking if user is authorized
            if (req.requestingUser.accountType != "seller") {
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
            let listings = await new PropertyListing().getPropertyListingsBySeller(id);

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

module.exports = SellerViewMyListingsController;
