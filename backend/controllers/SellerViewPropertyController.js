const Review = require("../entities/Review");

class SellerViewPropertyController {
    handleViewPropertyListing = async (req, res, next) => {
        const { id } = req.body;
        try {
            if (!id) {
                let err = new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            let review = await new Review().getReviewByID(id);
            res.status(200).json({
                review
            })

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = SellerViewPropertyController;
