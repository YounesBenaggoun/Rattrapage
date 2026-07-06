const express = require("express");
const router = express.Router();

const User = require("../src/3_InfraStructure/database/models/user.model");




const app = express();


app.get("/", async (req, res) => {
    try {
        const list = await User.find();
        return list;
    } catch (error) {
        return error.message;
    }
    // res.status(200).json({ message: "oui" })
})

app.use(express.json());
app.use("/user", require("./4_Presentation/routes/user.route"));
app.use("/exposition", require("./4_Presentation/routes/exposition.route"));



module.exports = app;

