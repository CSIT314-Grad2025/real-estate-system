const Review = require("../entities/Review.js");

// @UserStory
// As a buyer I want to be able to review my property agents,
// so that I can let other people know my experience with the property agents. 

class BuyerCreateReviewController {
    // Controller Method
    handleCreateReview = async (req, res, next) => {
        try {
            // Checking if user is authorized
            if (req.requestingUser.accountType != "buyer") {
                console.log(1)
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            const reviewerProfileId = req.profileId;
            if (!reviewerProfileId) {
                console.log(2)
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

            const { reviewBody } = req.body;
            if (!reviewBody) {
                let err = new Error('Missing field(s): reviewBody');
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            await new Review().updateReview(reviewerProfileId, agentProfileId, reviewBody);

            // Response sent to Boundary
            res.status(200).json({
                message: "Review submitted successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = BuyerCreateReviewController;
