const UserAccount = require("../entities/UserAccount");

class SystemAdminViewAccountController {
    handleViewAccount = async (req, res, next) => {
        const { email } = req.body;
        try {
            if (!email) {
                let err = new Error('Missing field(s): email');
                err.status = 400;
                throw err;
            }

            let account = await new UserAccount().getAccount(email);
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
