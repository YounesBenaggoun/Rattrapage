const express = require("express");
const router = express.Router();




const app = express();



app.use(express.json());
app.use("/user", require("./4_Presentation/routes/user.route"));
app.use("/exposition", require("./4_Presentation/routes/exposition.route"));



module.exports = app;

