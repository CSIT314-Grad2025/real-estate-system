const UserProfile = require("../entities/UserProfile");

class SystemAdminViewProfileController {
    handleViewProfile = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "systemadmin") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            let { id } = req.params;
            id = parseInt(id);

            if (typeof id !== 'number') {
                let err = new Error('Invalid ID');
                err.status = 400;
                throw err;
            }


            if (!id) {
                let err = new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            let account = await new UserProfile().getProfileById(id);
            res.status(200).json({
                account
            })

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = SystemAdminViewProfileController;
