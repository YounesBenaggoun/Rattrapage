import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
    await mongoose.connect(MONGO_URI);
    console.log(`🍃 MongoDB connected → ${mongoose.connection.host}`);
}

export default connectDB;