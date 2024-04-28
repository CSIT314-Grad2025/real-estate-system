const Review = require("../entities/Review.js");

class SellerCreateReviewController {
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

            let response = new Review().createReview(reviewTitle, reviewBody, reviewerID, rating, agentID);
            console.log(response);
        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

