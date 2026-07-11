// Port: lets use cases hash/compare passwords without knowing it's bcrypt underneath.
class IPasswordHasher {
    async hash(/* plainText */) {
        throw new Error('IPasswordHasher.hash() not implemented');
    }

    async compare(/* plainText, hash */) {
        throw new Error('IPasswordHasher.compare() not implemented');
    }
}

export default IPasswordHasher;
