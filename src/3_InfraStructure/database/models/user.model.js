
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        required: true
    },

    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        trim: true,
        type: String
    }
})

const Objet = mongoose.model("User", schema);


module.exports = Objet;