const UserInterface = require('../../1_Domain/contracts/UserContract');


const User = require("../database/models/user.model");




class UserRepositoryMongoDb extends UserInterface {
    constructor() {
        super();
    }
    async findByEmail(email) {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return userExist;
        }
        return false;
    }

    async save(user) {
        const newUser = await User.create({
            email: user.email,
            name: user.name,
            password: user.password,
            role: user.role
        })
        return newUser;
    }
    async findAll(req, res) {
        const list = await User.find();
        return list;
    }
}


module.exports = UserRepositoryMongoDb;