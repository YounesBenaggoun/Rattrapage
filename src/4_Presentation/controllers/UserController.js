import Config from "../../config.env.js";

import AllUser from "../../2_Application/usecases/user/User.getAll.usecase.js";
import RegisterUser from "../../2_Application/usecases/user/User.register.usecase.js";
import LoginUser from "../../2_Application/usecases/user/User.login.usecase.js";


import UserRepository from "../../3_InfraStructure/Repositories/User.Repository.js";

import PasswordHasher from "../../3_InfraStructure/security/bcrypt.js";
import JwtService from "../../3_InfraStructure/security/jwtService.js";



const repository = new UserRepository();
const passwordHasher = new PasswordHasher(Config.SALT_ROUNDS);
const tokenService = new JwtService(Config.JWT_SECRET);





const allUser = new AllUser(repository);
const registerUser = new RegisterUser(repository, passwordHasher, tokenService);
const loginUser = new LoginUser(repository, passwordHasher, tokenService);





const getAll = async (req, res) => {
    try {
        const users = await allUser.execute();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const register = async (req, res) => {
    try {
        const result = await registerUser.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const result = await loginUser.execute(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAll,
    register,
    login,
};