const UserProfile = require("../../entities/UserProfile");

class ViewProfileController {
    handleViewProfile = async (req, res, next) => {
        try {

            // Profile requested by accountId or profile id?
            let id = req.id;
            const profile = await new UserProfile().getUserProfileByAccount(id);

            res.status(200).json({
                profile
            })

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = ViewProfileController;
