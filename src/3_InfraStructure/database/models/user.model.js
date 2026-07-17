import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        trim: true
    }
},
    { timestamps: true }
);

const UserModel = mongoose.model("User", schema);

export default UserModel;