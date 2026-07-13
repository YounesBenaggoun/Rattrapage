import mongoose from "mongoose";

async function connectDB(mongo_uri) {

    await mongoose.connect(mongo_uri);
    console.log(`🍃 MongoDB connected → ${mongoose.connection.host}`);
}

export default connectDB;