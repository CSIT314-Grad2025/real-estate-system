const BuyerAccount = require("../entities/BuyerAccount");

class SystemAdminSearchAccountsController {
    handleSearch = async (req, res, next) => {
        const { accountType } = req.body;
        try {

            if (!accountType) {
                let err = new Error('Missing field(s): accountType');
                err.status = 400;
                throw err;
            }

            switch (accountType) {
                case 'Buyer':
                    {
                        let accounts = await new BuyerAccount().getAllAccounts();
                        res.status(200).json({
                            accounts
                        })
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

module.exports = SystemAdminSearchAccountsController;
