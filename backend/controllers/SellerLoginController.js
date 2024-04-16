const LoginToken = require("../entities/LoginToken.js");
const SellerAccount = require("../entities/SellerAccount.js");

class SellerLoginController {
    login = async (req, res, next) => {
        const { email, password } = req.body;

        // Request entity for account credentials
        // If successful send login token to boundary
        try {
            // Get Account from Entity
            const account = await new SellerAccount().getAccount(email);

            // Validate Account Credentials
            this.validateCredentials(password, account);

            // Persist login
            await account.setLoggedIn();

            // Generate login token
            // (The token is a string signed by the application to prove authenticity)
            const token = new LoginToken().generateToken(account.userId);

            // Send login token to the boundary via HTTP Response
            res.status(200).json({
                token: token.tokenString,
                email: account.email,
                userId: account.userId,
                firstName: account.firstName,
            })
        } catch (err) {
            err.status && res.status(err.status);
            next(err);
        }
    }

    validateCredentials = (password, account) => {
        if (password != account.password) {
            let err = new Error("Incorrect Password");
            err.status = 400;
            throw err;
        }
    }
}

module.exports = SellerLoginController;
