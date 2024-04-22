const BuyerAccount = require("../entities/BuyerAccount");

class BuyerLogoutController {
    logout = async (req, res, next) => {
        const userId = req.userId;

        try {
            // Get Account from Entity
            const account = await new BuyerAccount().getAccountById(userId);

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

module.exports = BuyerLogoutController;