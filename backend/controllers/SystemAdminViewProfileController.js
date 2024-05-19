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
            let accountId = parseInt(req.params.accountId);

            id = accountId ? accountId : id;

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

            let profile;

            // Profile requested by accountId or profile id?
            if (accountId) {
                profile = await new UserProfile().getUserProfileByAccount(id);
            } else {
                profile = await new UserProfile().getUserProfile(id);
            }

            res.status(200).json({
                profile
            })

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = SystemAdminViewProfileController;
