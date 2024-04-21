const jwt = require('jsonwebtoken')
class LoginToken {
    tokenString;
    constructor() {
        this.tokenString = null;
    }

    generateToken(userId) {
        let token = new LoginToken();
        token.tokenString = jwt.sign({
            userId,
        }, process.env.JWT_SECRET, { expiresIn: '30d' });

        return token;
    }
}

module.exports = LoginToken;
