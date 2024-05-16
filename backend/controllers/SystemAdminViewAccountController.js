const UserAccount = require("../entities/UserAccount");

class SystemAdminViewAccountController {
    handleViewAccount = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "systemadmin") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            let id = parseInt(req.params.id);

            if (!id) {
                let err = isNaN(id) ? new Error('Invalid ID: ID must be an integer')
                    : new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            let account = await new UserAccount().getAccountById(id);
            res.status(200).json({
                account
            })

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = SystemAdminViewAccountController;
