const UserAccount = require("../entities/UserAccount");

class SystemAdminLogoutController {
    logout = async (req, res, next) => {
        try {
            // Check if user is Authorized
            if (req.requestingUser.accountType != "systemadmin") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Get user id from request
            const id = req.id;

            // Get Account from Entity
            const account = await new UserAccount().getAccountById(id);

            // Persist Logout
            await account.setLoggedOut();

            // Respond with OK 200 to the boundary
            res.status(200).json({
                message: "Logged out successfully"
            });
        } catch (err) {
            err.status && res.status(err.status)
            next(err);
        }
    }
}

module.exports = SystemAdminLogoutController;
