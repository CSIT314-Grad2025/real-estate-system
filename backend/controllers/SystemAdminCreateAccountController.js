const BuyerAccount = require("../entities/BuyerAccount");
const RealEstateAgentAccount = require("../entities/RealEstateAgentAccount");
const SellerAccount = require("../entities/SellerAccount");

class SystemAdminCreateAccountController {
    handleCreateAccount = async (req, res, next) => {
        try {
            const { firstName, lastName, email, password, accountType } = req.body;

            const requiredFields = ['firstName', 'lastName', 'email', 'password', 'accountType'];
            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                const missingFieldNames = missingFields.join(', ');
                const errorMessage = `Missing Field(s): ${missingFieldNames}`;
                let err = new Error(errorMessage);
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
                case 'Seller':
                    {
                        await new SellerAccount().createAccount(firstName, lastName, email, password);
                        res.status(201).json({
                            message: "User created successfully"
                        });
                        break;
                    }
                case 'RealEstateAgent':
                    {
                        await new RealEstateAgentAccount().createAccount(firstName, lastName, email, password);
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
