const UserProfile = require("../entities/UserProfile");

class SystemAdminCreateProfileController {
    handleCreateProfile = async (req, res, next) => {
        try {
            // Checking if user is authorized
            if (req.requestingUser.accountType != "systemadmin") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            // Parsing id from params
            let accountId = parseInt(req.params.accountId);

            if (!accountId) {
                let err = isNaN(accountId) ? new Error('Invalid ID: ID must be an integer')
                    : new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            const { firstName, lastName, bio, contactNumber, avatar } = req.body;

            const requiredFields = ['firstName', 'lastName', 'bio', 'contactNumber', 'avatar'];
            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                const missingFieldNames = missingFields.join(', ');
                const errorMessage = `Missing Field(s): ${missingFieldNames}`;
                let err = new Error(errorMessage);
                err.status = 400;
                throw err;
            }

            // Entity method call
            await new UserProfile().createUserProfile(
                firstName, lastName, bio, contactNumber, avatar, accountId
            );

            // Response sent to Boundary
            res.status(201).json({
                message: "User Profile Created Successfully"
            });

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = SystemAdminCreateProfileController;
