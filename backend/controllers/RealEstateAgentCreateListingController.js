const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Real Estate Agent, I want to create the listing of a property,
// so that the users can see the listed properties

class RealEstateAgentCreateListingController {
    // Controller Method
    handleCreateListing = async (req, res, next) => {
        try {
            const { title, listingAgentID, sellerID, description, propertyType, livingArea, numberOfBedrooms, numberOfBathrooms, listPrice } = req.body;

            const requiredFields = ['title', 'listingAgentID', 'sellerID', 'description', 'propertyType', 'numberOfBedrooms', 'numberOfBathrooms', 'listPrice'];
            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                const missingFieldNames = missingFields.join(', ');
                const errorMessage = `Missing Field(s): ${missingFieldNames}`;
                let err = new Error(errorMessage);
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            await new PropertyListing().createPropertyListing(
                title, listingAgentID, sellerID, description, propertyType, livingArea,
                numberOfBedrooms, numberOfBathrooms, listPrice
            );

            // Response sent to the Boundary
            res.status(201).json({
                message: "Property Listing created successfully"
            });

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = RealEstateAgentCreateListingController;
