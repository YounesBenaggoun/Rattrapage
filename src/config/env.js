import dotenv from "dotenv";

dotenv.config({
    quiet: true,
});

const Config = {
    PORT: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI || "mongodb+srv://Younes:12341234@cluster0.3684pxb.mongodb.net/Rattrapage",
    jwtSecret: process.env.JWT_SECRET || "change_this_secret",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
    saltRounds: Number(process.env.SALT_ROUNDS) || 10,
};

export default Config;