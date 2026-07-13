import bcrypt from "bcrypt";
import IPasswordHasher from "../../1_Domain/interface/security/PasswordHasher.Interface.js";

class BcryptHasher extends IPasswordHasher {
    constructor(saltRounds = 10) {
        super();
        this.saltRounds = saltRounds;
    }

    async hash(plainText) {
        return await bcrypt.hash(plainText, this.saltRounds);
    }

    async compare(plainText, hash) {
        return bcrypt.compare(plainText, hash);
    }
}

export default BcryptHasher;