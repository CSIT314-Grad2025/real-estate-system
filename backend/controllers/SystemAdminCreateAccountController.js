const BuyerAccount = require("../entities/BuyerAccount");

class SystemAdminCreateAccountController {
    handleCreateAccount = async (req, res, next) => {
        try {
            const { firstName, lastName, email, password, accountType } = req.body;

            if (!firstName || !lastName || !email || !accountType) {
                let err = new Error('Invalid Form Data');
                err.status = 400;
                throw err;
            }

            // Check if valid account type
            switch (accountType) {
                // Request respective entity
                case 'Buyer':
                    {
                        await new BuyerAccount().createAccount(firstName, lastName, email, password);
                        res.status(201).json({
                            message: "User created successfully"
                        });
                        break;
                    }
                default:
                    {
                        let err = new Error('Invalid User Type');
                        err.status = 400;
                        throw err;
                    }
            }

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = SystemAdminCreateAccountController;
