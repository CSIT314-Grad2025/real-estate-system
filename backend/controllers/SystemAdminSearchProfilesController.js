const UserProfile = require("../entities/UserProfile");

class SystemAdminSearchProfilesController {
    handleSearch = async (req, res, next) => {
        try {
            if (req.requestingUser.accountType != "systemadmin") {
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }
            const userProfiles = await new UserProfile().getAllProfiles();

            console.log({ message: "From Controller", data: userProfiles })
            res.status(200).json(userProfiles);
        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = SystemAdminSearchProfilesController;
