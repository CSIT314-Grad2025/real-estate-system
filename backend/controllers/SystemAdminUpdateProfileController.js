const UserProfile = require("../entities/UserProfile");

class SystemAdminUpdateProfileController {
    handleUpdateProfile = async (req, res, next) => {
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
            const {
                firstName,
                lastName,
                bio,
                contactNumber,
                avatar,
            } = req.body;

            let account = new UserProfile();
            account.id = id;
            account.firstName = firstName;
            account.lastName = lastName;
            account.bio = bio;
            account.contactNumber = contactNumber;
            account.avatar = avatar;

            await account.updateProfile();
            res.status(200).json({
                message: "User Profile updated successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = SystemAdminUpdateProfileController;
