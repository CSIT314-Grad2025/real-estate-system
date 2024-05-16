const UserAccount = require("../entities/UserAccount");

class SystemAdminCreateAccountController {
    handleCreateAccount = async (req, res, next) => {
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

            console.log(res.statusCode)
            // Entity method call
            await new UserAccount().createAccount(email, password, accountType)

            // Response sent to Boundary
            res.status(201).json({
                message: "User Account Created Successfully"
            });

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = SystemAdminCreateAccountController;
