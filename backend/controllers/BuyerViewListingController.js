const PropertyListing = require("../entities/PropertyListing");

// These two user stories should be combined, they do the same thing
// The search controller is responsible for differentiating between new and sold properties,
// not the view controller

// @UserStory
// As a buyer, I want to view the new property listings so that I can
// see the available properties and find that match my preferences.

// @UserStory
// As a buyer, I want to view the sold property listings so that I can
// research past sales and gain insights into property values.

class BuyerViewListingController {
    // Controller Method
    handleViewPropertyListing = async (req, res, next) => {
        const { id } = req.body;
        try {
            if (!id) {
                let err = new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            let propertyListing = await new PropertyListing().getPropertyListingByID(id);

            // Property listing object sent to the boundary
            res.status(200).json({
                propertyListing
            })

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = BuyerViewListingController;
