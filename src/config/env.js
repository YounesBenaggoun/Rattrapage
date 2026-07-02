require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/clean_arch_users',
    jwtSecret: process.env.JWT_SECRET || 'change_this_secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    saltRounds: Number(process.env.SALT_ROUNDS) || 10,
};
