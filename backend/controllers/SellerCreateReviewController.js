const Review = require("../entities/Review.js");

// @UserStory
// As a seller I want to be able to review my property agents,
// so that I can let other people know my experience with the property agents. 

class SellerCreateReviewController {
    // Controller Method
    handleCreateReview = async (req, res, next) => {
        try {
            const { reviewTitle, reviewBody, reviewerID, rating, agentID } = req.body;

            const requiredFields = ['reviewTitle', 'reviewBody', 'reviewerID', 'rating', 'agentID'];
            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                const missingFieldNames = missingFields.join(', ');
                const errorMessage = `Missing Field(s): ${missingFieldNames}`;
                let err = new Error(errorMessage);
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            new Review().createReview(reviewTitle, reviewBody, reviewerID, rating, agentID);

            // Response sent to Boundary
            res.status(201).json({
                message: "Review submitted successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = SellerCreateReviewController;
