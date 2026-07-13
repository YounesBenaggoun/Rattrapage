import User from "../../../1_Domain/entities/User.js";

class RegisterUser {
    constructor(userRepository, passwordHasher, tokenService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenService = tokenService;

    }
    async execute({ name, email, password, role }) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("A user with this email already exists");
        }
        const hashedPassword = await this.passwordHasher.hash(password);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        const newUser = await this.userRepository.save(user);
        const token = this.tokenService.generateToken({
            id: newUser.id,
            email,
            role: newUser.role
        });

        return {
            token,
            user: newUser
        };
    }
}
export default RegisterUser;