import UserInterface from "../../1_Domain/interface/User.Interface.js";
import User from "../database/models/user.model.js";

class UserRepositoryMongoDb extends UserInterface {
    constructor() {
        super();
    }

    async findByEmail(email) {
        const userExist = await User.findOne({ email }).collation({
            locale: "en",
            strength: 2
        });

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
        });
        return newUser;
    }
    async findAll() {
        const list = await User.find();
        return list;
    }
}
export default UserRepositoryMongoDb;