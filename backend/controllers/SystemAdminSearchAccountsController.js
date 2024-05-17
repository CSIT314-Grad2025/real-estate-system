const UserAccount = require("../entities/UserAccount");

class SystemAdminSearchAccountsController {
    handleSearch = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "systemadmin") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }
            const userAccounts = await new UserAccount().getAllAccounts();

            console.log({ message: "From Controller", data: userAccounts })

            res.status(200).json(userAccounts);

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = SystemAdminSearchAccountsController;
