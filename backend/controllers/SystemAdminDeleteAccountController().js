const UserAccount = require("../entities/UserAccount");

class SystemAdminDeleteAccountController {
    handleDeleteAccount = async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) {
                let err = new Error('Missing field(s): email');
                err.status = 400;
                throw err;
            }

            await new UserAccount().deleteAccount(email);
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
