const jwt = require('jsonwebtoken');
const ITokenService = require('../../1_Domain/contracts/security/itokenService');

class JwtService extends ITokenService {
    constructor(secret, expiresIn = '180d') {
        super();
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    generateToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    verifyToken(token) {
        return jwt.verify(token, this.secret);
    }
}

module.exports = JwtService;
