const UserAccount = require("../entities/UserAccount");

class SystemAdminDeleteAccountController {
    handleDeleteAccount = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "systemadmin") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Parsing account id from query params
            let { id } = req.params
            if (!id) {
                let err = new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }
            try {
                id = parseInt(id);
            } catch (e) {
                let err = new Error('Invalid ID: ID must be an Integer');
                err.status = 400;
                throw err;
            }

            // Entity method call
            await new UserAccount().deleteAccount(id);
            res.status(200).json({
                message: "User Account deleted successfully"
            });

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = SystemAdminDeleteAccountController;
