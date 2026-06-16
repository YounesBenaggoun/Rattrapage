
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js";
import userRoute from "./Routes/user.route.js"

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());




app.use("/User", userRoute);


app.get("/", (req, res) => {
    res.send("bonjour");
})


app.listen(PORT, () => {
    console.log("Server Listen on ", PORT)
})

connectDB();


