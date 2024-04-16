const DBConnection = require("../../config/dbConfig");
const jwt = require('jsonwebtoken')

class AuthMiddleware {

    protect = async (req, res, next) => {
        const pool = DBConnection.pool;

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1];

                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const dbResponse = await pool.query(`
                    SELECT * FROM "Users"
                    WHERE id = '${decoded.userId}'
                    `)

                if (dbResponse.rows.length == 0) {
                    res.status(401);
                    throw new Error("Not authorized");
                }

                const user = dbResponse.rows[0];
                req.userId = user.id;


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
