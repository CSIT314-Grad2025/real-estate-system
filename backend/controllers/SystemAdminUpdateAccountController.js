const UserAccount = require("../entities/UserAccount");

class SystemAdminUpdateAccountController {
    handleUpdateAccount = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "systemadmin") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Parsing id from query params
            let id = parseInt(req.params.id);
            if (!id) {
                let err = isNaN(id) ? new Error('Invalid ID: ID must be an integer')
                    : new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            // Destrucutre field data from request body
            const { email, password } = req.body;
            let account = new UserAccount();
            account.id = id;
            account.email = email;
            account.password = password;

            await account.updateAccount();
            res.status(200).json({
                message: "User Account updated successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = SystemAdminUpdateAccountController;
