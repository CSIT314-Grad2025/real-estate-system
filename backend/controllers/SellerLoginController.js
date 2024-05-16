const LoginToken = require("../entities/LoginToken.js");
const UserAccount = require("../entities/UserAccount.js");

class SellerLoginController {
    handleLogin = async (req, res, next) => {

        // Request entity for account credentials
        // If successful send login token to boundary
        try {
            const { email, password, accountType } = req.body;

            const requiredFields = ['email', 'password', 'accountType'];
            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                const missingFieldNames = missingFields.join(', ');
                const errorMessage = `Missing Field(s): ${missingFieldNames}`;
                let err = new Error(errorMessage);
                err.status = 400;
                throw err;
            }

            // Get Account from Entity
            const account = await new UserAccount().login(email, password, accountType);

            // Generate login token
            // (The token is a string signed by the application to prove authenticity)
            const token = new LoginToken().generateToken(account.id);

            // Send login token to the boundary via HTTP Response
            res.status(200).json({
                token: token.tokenString,
                email: account.email,
                id: account.id,
                accountType: account.accountType,
            })
        } catch (err) {
            err.status && res.status(err.status);
            next(err);
        }
    }
}

module.exports = SellerLoginController;
