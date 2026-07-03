
class UserContract {
    async save(user) { throw new Error('ERROR :  SAVE_METHOD_NOT_IMPLEMENTED'); }
    async findByEmail(email) { throw new Error('ERROR :  FindByEmail_METHOD_NOT_IMPLEMENTED'); }
    async findAll() { throw new Error('ERROR : Method FindAll not emplemented') }
}

module.exports = UserContract;
