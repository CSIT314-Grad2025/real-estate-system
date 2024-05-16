const UserProfile = require("../entities/UserProfile");

class SystemAdminViewProfileController {
    handleViewProfile = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "systemadmin") {
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


            if (!id) {
                let err = new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            let profile = await new UserProfile().getUserProfile(id);
            res.status(200).json({
                profile
            })

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = SystemAdminViewProfileController;
