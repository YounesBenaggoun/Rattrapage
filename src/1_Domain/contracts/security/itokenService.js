// Port: lets use cases issue/verify tokens without knowing it's JWT underneath.
class ITokenService {
    generateToken(/* payload */) {
        throw new Error('ITokenService.generateToken() not implemented');
    }

    verifyToken(/* token */) {
        throw new Error('ITokenService.verifyToken() not implemented');
    }
}

module.exports = ITokenService;
