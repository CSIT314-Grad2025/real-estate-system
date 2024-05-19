const PropertyListing = require("../../entities/PropertyListing");

class ViewListingController {
    handleViewListing = async (req, res, next) => {
        try {

            // Profile requested by accountId or profile id?
            let id = parseInt(req.params.id);
            if (!id) {
                let err = isNaN(id) ? new Error('Invalid ID: ID must be an integer')
                    : new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            const listing = await new PropertyListing().getPropertyListingByID(id);

            res.status(200).json({
                listing
            })
        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = ViewListingController;
