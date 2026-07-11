class ITokenService {
    generateToken(/* payload */) {
        throw new Error("ITokenService.generateToken() not implemented");
    }

    verifyToken(/* token */) {
        throw new Error("ITokenService.verifyToken() not implemented");
    }
}

export default ITokenService;