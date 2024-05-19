const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Real Estate Agent, I want to create the listing of a property,
// so that the users can see the listed properties

class RealEstateAgentCreateListingController {
    // Controller Method
    handleCreateListing = async (req, res, next) => {
        try {
            // Checking if user is authorized
            if (req.requestingUser.accountType != "realestateagent") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            const agentProfileId = req.profileId;

            if (!agentProfileId) {
                let err = new Error('Missing Field: agentProfileId');
                err.status = 400;
                throw err;
            }

            const {
                title,
                description,
                propertyType,
                livingArea,
                bedrooms,
                bathrooms,
                location,
                listPrice,
                sellerEmail,
            } = req.body;

            const requiredFields = [
                'title',
                'description',
                'propertyType',
                'livingArea',
                'bedrooms',
                'bathrooms',
                'location',
                'listPrice',
                'sellerEmail',
            ];

            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                const missingFieldNames = missingFields.join(', ');
                const errorMessage = `Missing Field(s): ${missingFieldNames}`;
                let err = new Error(errorMessage);
                err.status = 400;
                throw err;
            }

            const isAvailable = true;

            // Entity Method Call
            await new PropertyListing().createPropertyListing(
                title,
                description,
                propertyType,
                livingArea,
                bedrooms,
                bathrooms,
                listPrice,
                isAvailable,
                sellerEmail,
                agentProfileId,
                location,
            );

            // Response sent to the Boundary
            res.status(201).json({
                message: "Property Listing created successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = RealEstateAgentCreateListingController;
