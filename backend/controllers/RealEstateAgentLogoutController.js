const UserAccount = require("../entities/UserAccount");

class RealEstateAgentLogoutController {
    logout = async (req, res, next) => {
        try {
            // Check if user is Authorized
            if (req.requestingUser.accountType != "realestateagent") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Get user id from request
            const id = req.id;

            // Entity method call
            await new UserAccount().logout(id);

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

module.exports = RealEstateAgentLogoutController;
