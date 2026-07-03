class UserLogin {
    constructor(userRepository, passwordHasher, tokenService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenService = tokenService;

    }
    async execute({ email, password }) {

        const existingUser = await this.userRepository.findByEmail(email);

        if (!existingUser) {
            const error = new Error('Invalid email');
            error.statusCode = 401;
            throw error;
        }

        const match = await this.passwordHasher.compare(password, existingUser.password);
        if (!match) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const token = this.tokenService.generateToken({
            id: existingUser.id,
            email,
            role: existingUser.role
        })

        return {
            user: existingUser,
            token
        }
    }
}

module.exports = UserLogin;