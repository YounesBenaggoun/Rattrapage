const express = require("express");
const app = express();


const cors = require("cors");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;


const connectDB = require("./config/db.js")();

app.use(express.json());
app.use(cors());




app.listen(PORT, () => {
    console.log("Server Listen on ", PORT)
})