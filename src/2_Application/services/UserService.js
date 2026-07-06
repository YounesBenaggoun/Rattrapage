import GetUsers from "../usecases/user/User.getAll.case.js";
import RegisterUser from "../usecases/user/User.register.case.js";
import LoginUser from "../usecases/user/User.login.case.js";

class UserService {
    constructor(repository, passwordHasher, tokenService) {
        this.getUsers = new GetUsers(repository);
        this.registerUser = new RegisterUser(repository, passwordHasher, tokenService);
        this.loginUser = new LoginUser(repository, passwordHasher, tokenService);
    }
}

export default UserService;