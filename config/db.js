
import mongoose from "mongoose";


const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("[DataBase] - Connected - MangoDB"))
        .catch((error) => {
            console.log("ERROR", error);
        })
}


export default connectDB;