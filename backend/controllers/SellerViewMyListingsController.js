const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As A Seller I want to be able to view all of my listed properties, so that I can
// know their status at a glance

class SellerViewMyListingsController {
    // Controller Method
    handleViewListings = async (req, res, next) => {
        const { sellerID } = req.body;
        try {

            if (!sellerID) {
                let err = new Error('Missing field(s): SellerID');
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            let listings = await new PropertyListing().getPropertyListingsBySeller(sellerID);

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
