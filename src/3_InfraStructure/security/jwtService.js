import jwt from "jsonwebtoken";
import ITokenService from "../../1_Domain/interface/security/TokenService.Interface.js";

class JwtService extends ITokenService {
    constructor(secret, expiresIn = "180d") {
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

export default JwtService;