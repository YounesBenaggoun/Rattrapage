const GetUsers = require("../usecases/user/User.getAll.case");
const RegisterUser = require("../usecases/user/User.register.case");
const LoginUser = require("../usecases/user/User.login.case");


class UserService {
    constructor(repository, passwordHasher, tokenService) {
        this.getUsers = new GetUsers(repository);
        this.registerUser = new RegisterUser(repository, passwordHasher, tokenService);
        this.loginUser = new LoginUser(repository, passwordHasher, tokenService);
    }
}

module.exports = UserService;