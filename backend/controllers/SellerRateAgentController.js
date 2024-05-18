const RealEstateAgentAccount = require("../entities/RealEstateAgentAccount");

// @UserStory
// As a seller, I want to be able to rate my property agents,
// so that I can let other people know if the agent is great or not.

class SellerRateAgentController {
    // Controller method
    handleRateAgent = async (req, res, next) => {
        try {
            // Checking if user is authorized
            if (req.requestingUser.accountType != "seller") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            const sellerProfileId = req.profileId;
            if (!sellerProfileId) {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Parsing id from query params
            let agentProfileId = parseInt(req.params.agentProfileId);
            if (!agentProfileId) {
                let err = isNaN(agentProfileId) ? new Error('Invalid Agent ID: ID must be an integer')
                    : new Error('Missing param(s): agentProfileId');
                err.status = 400;
                throw err;
            }
            const { rating } = req.body;

            const requiredFields = ['rating',];
            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                const missingFieldNames = missingFields.join(', ');
                const errorMessage = `Missing Field(s): ${missingFieldNames}`;
                let err = new Error(errorMessage);
                err.status = 400;
                throw err;
            }

            // Entity method call
            let response = new RealEstateAgentAccount().updateRating(rating);
            console.log(response);

            // Response sent to Boundary
            res.status(200).json({
                message: "Agent rating submitted successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            err.status = 400;
            next(err);
        }
    }
}

module.exports = SellerRateAgentController;
