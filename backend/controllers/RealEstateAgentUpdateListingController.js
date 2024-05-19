const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a Real Estate Agent, I want to update the information of the properties I have listed
// so that the information is up to date.

class RealEstateAgentUpdateListingController {
    // Controller Method
    handleUpdateListing = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "realestateagent") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Parsing id from query params
            let id = parseInt(req.params.id);
            if (!id) {
                let err = isNaN(id) ? new Error('Invalid ID: ID must be an integer')
                    : new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            const agentProfileId = req.profileId

            // Destrucutre field data from request body
            const {
                title,
                sellerProfileId,
                description,
                propertyType,
                livingArea,
                bedrooms,
                bathrooms,
                listPrice,
                location,
                isAvailable,
                views,
            } = req.body;

            let propertyListing = new PropertyListing();
            propertyListing.id = id;
            propertyListing.title = title;
            propertyListing.agentProfileId = agentProfileId;
            propertyListing.sellerProfileId = sellerProfileId;
            propertyListing.description = description;
            propertyListing.propertyType = propertyType;
            propertyListing.livingArea = livingArea;
            propertyListing.bedrooms = bedrooms;
            propertyListing.bathrooms = bathrooms;
            propertyListing.listPrice = listPrice;
            propertyListing.location = location;
            propertyListing.isAvailable = isAvailable;
            propertyListing.views = views;

            await propertyListing.updatePropertyListing();
            res.status(200).json({
                message: "Property Listing updated successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = RealEstateAgentUpdateListingController;
