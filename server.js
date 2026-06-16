const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");

const userRoute = require("./routes/user.route.js");


const app = express();

const PORT = process.env.PORT;





app.use(express.json());
app.use(cors());
app.use("/User", userRoute);




app.listen(PORT, () => {
    console.log("Server Listen on ", PORT)
})


connectDB();