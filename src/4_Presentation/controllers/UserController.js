


const UserService = require("../../2_Application/services/UserService");
const UserRepository = require("../../3_InfraStructure/Repositories/MangoDbUserRepository");
const PasswordHasher = require("../../3_InfraStructure/security/bcrypt");
const JwtService = require("../../3_InfraStructure/security/jwtService");




const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

const passwordHasher = new PasswordHasher(SALT_ROUNDS);
const repository = new UserRepository();
const tokenService = new JwtService(JWT_SECRET);

const service = new UserService(repository, passwordHasher, tokenService);





exports.getAll = async (req, res, next) => {
    try {
        const users = await service.getUsers.execute();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
        next(error)
    }

}

exports.register = async (req, res, next) => {
    try {
        const result = await service.registerUser.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message })
        next(error)

    }
}

exports.login = async (req, res, next) => {
    try {
        const result = await service.loginUser.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message })
        next(error)
    }

}

