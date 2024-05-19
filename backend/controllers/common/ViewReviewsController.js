const Review = require("../../entities/Review");

class ViewReviewsController {
    handleViewReviews = async (req, res, next) => {
        try {

            // Parsing id from query params
            let id = parseInt(req.params.id);
            if (!id) {
                let err = isNaN(id) ? new Error('Invalid ID: ID must be an integer')
                    : new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            const reviews = await new Review().getReviewsByAgentProfileId(id);

            res.status(200).json({
                reviews
            })

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = ViewReviewsController;
