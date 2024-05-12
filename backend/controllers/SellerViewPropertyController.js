const PropertyListing = require("../entities/PropertyListing");

class SellerViewPropertyController {
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

module.exports = SellerViewPropertyController;
