const PropertyListing = require("../entities/PropertyListing");

class SellerViewPropertyController {
    // Controller Method
    handleViewPropertyListing = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "seller") {
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
            let propertyListing = await new PropertyListing().getPropertyListingByID(id);

            // Property listing object sent to the boundary
            res.status(200).json({
                propertyListing
            })

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = SellerViewPropertyController;
