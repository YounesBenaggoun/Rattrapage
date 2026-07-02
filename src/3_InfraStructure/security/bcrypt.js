const bcrypt = require('bcrypt');

const IPasswordHasher = require("../../1_Domain/contracts/security/ipasswordHasher");



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

module.exports = BcryptHasher;