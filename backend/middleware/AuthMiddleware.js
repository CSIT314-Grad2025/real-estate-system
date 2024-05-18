const DBConnection = require("../../config/dbConfig");
const jwt = require('jsonwebtoken');
const UserProfile = require("../entities/UserProfile");

class AuthMiddleware {

    protect = async (req, res, next) => {
        const pool = DBConnection.pool;

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1];

                // Verify token
                let decoded;

                // Custom Error Handling
                try {
                    decoded = jwt.verify(token, process.env.JWT_SECRET);
                } catch (err) {
                    res.status(401);
                    throw new Error("Not authorized");
                }

                // Validate user from DB
                const dbResponse = await pool.query(`
                    SELECT * FROM "Users"
                    WHERE id = ${decoded.id}
                    `)

                if (dbResponse.rows.length == 0) {
                    res.status(401);
                    throw new Error("Not authorized");
                }

                // Attach user context to the request
                const user = dbResponse.rows[0];
                req.id = user.id;
                req.requestingUser = user;

                try {
                    let userProfile = await new UserProfile().getUserProfileByAccount(user.id);
                    req.profileId = userProfile.id;
                } catch (err) {
                }

                next();
            } catch (err) {
                next(err);
            }
        }

        if (!token) {
            res.status(401);
            next(new Error('Not authorized, no token'));
        }
    }
}

module.exports = AuthMiddleware;
