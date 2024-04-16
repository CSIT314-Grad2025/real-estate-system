const SystemAdminAccount = require("../entities/SystemAdminAccount");

class SystemAdminLogoutController {
    logout = async (req, res, next) => {
        const userId = req.userId;

        try {
            // Get Account from Entity
            const account = await new SystemAdminAccount().getAccountById(userId);

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
