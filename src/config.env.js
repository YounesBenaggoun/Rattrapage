import "dotenv/config";



const Config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

export default Config;