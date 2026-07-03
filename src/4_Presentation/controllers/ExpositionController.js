





const ExpositionRepository = require("../../3_InfraStructure/Repositories/ExpositionRepository");

const ExpositionAdd = require("../../2_Application/usecases/Exposition/Exposition.Add.case");


const expositionAdd = new ExpositionAdd(new ExpositionRepository);

exports.add = async (req, res, next) => {
    try {
        const result = await expositionAdd.execute(req.body);
        console.log(req.body);
        // const result = await service.registerUser.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message })
        // next(error)

    }
}


// const SALT = 10;
// const JWT_SECRET = "jwt_secret"

// const passwordHasher = new PasswordHasher(SALT);
// const repository = new UserRepository();
// const tokenService = new JwtService("jwt_secret");

// const service = new UserService(repository, passwordHasher, tokenService);





// exports.getAll = async (req, res, next) => {
//     try {
//         const users = await service.getUsers.execute();
//         res.status(201).json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//         next(error)
//     }

// }



// exports.login = async (req, res, next) => {
//     try {
//         const result = await service.loginUser.execute(req.body);
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//         next(error)
//     }

// }

