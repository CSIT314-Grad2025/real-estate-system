const Review = require("../../entities/Review");
const UserProfile = require("../../entities/UserProfile");

class ViewProfileController {
    handleViewProfile = async (req, res, next) => {
        try {

            // Parsing id from query params
            let id = parseInt(req.params.id);
            if (!id) {
                let err = isNaN(id) ? new Error('Invalid ID: ID must be an integer')
                    : new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            const profile = await new UserProfile().getUserProfile(id);

            res.status(200).json({
                profile,
            })

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = ViewProfileController;
