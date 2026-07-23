import UserInterface from "../../1_Domain/interface/User.Interface.js";
import UserModel from "../database/models/user.model.js";

class UserRepositoryMongoDb extends UserInterface {
    constructor() {
        super();
    }

    async findByEmail(email) {
        const userExist = await UserModel.findOne({ email }).collation({
            locale: "en",
            strength: 2
        });

        if (userExist) {
            return userExist;
        }
        return false;
    }

    async save(user) {
        const newUser = await UserModel.create({
            email: user.email,
            name: user.name,
            password: user.password,
            role: user.role
        });
        return newUser;
    }
    async findAll() {
        const list = await UserModel.find();
        return list;
    }
    async delete(id) {
        const list = await UserModel.findByIdAndDelete(id);
        return list;
    }
}
export default UserRepositoryMongoDb;