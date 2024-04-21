const { response } = require("express");
const UserAccount = require("../entities/UserAccount");

class SystemAdminUpdateAccountController {
    handleUpdateAccount = async (req, res, next) => {
        try {
            const { firstName, lastName, email, password } = req.body;

            if (!email) {
                let err = new Error('Missing field(s): email');
                err.status = 400;
                throw err;
            }

            let account = new UserAccount();
            account.firstName = firstName;
            account.lastName = lastName;
            account.email = email;
            account.password = password;

            await account.updateAccount();
            res.status(200).json({
                message: "User Account updated successfully"
            });

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = SystemAdminUpdateAccountController;
