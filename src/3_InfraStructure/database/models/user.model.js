
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    }
})

const Objet = mongoose.model("User", schema);


module.exports = Objet;