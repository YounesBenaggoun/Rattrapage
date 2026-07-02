const mongoose = require('mongoose');

const MONGO_URI =
    process.env.MONGO_URI ?? 'mongodb+srv://Younes:12341234@cluster0.3684pxb.mongodb.net/CleanUser';

async function connectDB() {
    await mongoose.connect(MONGO_URI);
    console.log(`🍃  MongoDB connected → ${mongoose.connection.host}`);
}

module.exports = connectDB;
