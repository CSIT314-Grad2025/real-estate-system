const Review = require("../entities/Review");

// @UserStory
// As a buyer, I want to be able to rate my property agents,
// so that I can let other people know if the agent is great or not.

class BuyerRateAgentController {
    // Controller method
    handleRateAgent = async (req, res, next) => {
        try {
            // Checking if user is authorized
            if (req.requestingUser.accountType != "buyer") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            const reviewerProfileId = req.profileId;
            if (!reviewerProfileId) {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Parsing id from query params
            const agentProfileId = parseInt(req.params.agentProfileId);
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
            await new Review().createReview(rating, '', reviewerProfileId, agentProfileId);

            // Response sent to Boundary
            res.status(200).json({
                message: "Agent rating submitted successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = BuyerRateAgentController;
