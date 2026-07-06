import dotenv from "dotenv";

dotenv.config({
    quiet: true,
});

const Config = {
    PORT: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
    saltRounds: Number(process.env.SALT_ROUNDS) || 10,
};

export default Config;