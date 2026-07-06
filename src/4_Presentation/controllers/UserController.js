import UserService from "../../2_Application/services/UserService.js";
import UserRepository from "../../3_InfraStructure/Repositories/MangoDbUserRepository.js";
import PasswordHasher from "../../3_InfraStructure/security/bcrypt.js";
import JwtService from "../../3_InfraStructure/security/jwtService.js";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

const passwordHasher = new PasswordHasher(SALT_ROUNDS);
const repository = new UserRepository();
const tokenService = new JwtService(JWT_SECRET);

const service = new UserService(repository, passwordHasher, tokenService);

const getAll = async (req, res, next) => {
    try {
        const users = await service.getUsers.execute();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const result = await service.registerUser.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await service.loginUser.execute(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
        next(error);
    }
};

export default {
    getAll,
    register,
    login,
};