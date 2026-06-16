
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name : String,
    email: {
        type: String,
        require: true,
        unique: true
    },
    
    password: {
        type: String,
        require: true
    }, 
    role : {
        type:String,
        default : "user"
    }
})

export default mongoose.model("User", UserSchema);