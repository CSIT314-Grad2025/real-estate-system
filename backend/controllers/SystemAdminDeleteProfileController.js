const UserProfile = require("../entities/UserProfile");

class SystemAdminDeleteProfileController {
    handleDeleteProfile = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "systemadmin") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Parsing id from params
            let id = parseInt(req.params.id);

            if (!id) {
                let err = isNaN(id) ? new Error('Invalid ID: ID must be an integer')
                    : new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            // Entity method call
            await new UserProfile().deleteProfile(id);
            res.status(200).json({
                message: "User Profile deleted successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = SystemAdminDeleteProfileController;
