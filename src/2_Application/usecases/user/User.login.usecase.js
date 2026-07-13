class UserLogin {
    constructor(userRepository, passwordHasher, tokenService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenService = tokenService;

    }
    async execute({ email, password }) {

        const existingUser = await this.userRepository.findByEmail(email);
        if (!existingUser) {
            throw new Error("Invalid email");
        }
        const match = await this.passwordHasher.compare(password, existingUser.password);
        if (!match) {
            throw new Error("Invalid email or password");
        }
        const token = this.tokenService.generateToken({
            id: existingUser.id,
            email,
            role: existingUser.role
        });
        return {
            user: existingUser,
            token
        };
    }
}

export default UserLogin;