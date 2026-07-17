
class IUser {
    async save(_user) { throw new Error("ERROR :  SAVE_METHOD_NOT_IMPLEMENTED"); }
    async findByEmail(_email) { throw new Error("ERROR :  FindByEmail_METHOD_NOT_IMPLEMENTED"); }
    async findAll() { throw new Error("ERROR : Method FindAll not emplemented"); }
    
}

export default IUser;
