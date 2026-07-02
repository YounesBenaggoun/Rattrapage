const express = require("express");
const router = express.Router();

function createApp() {
    const app = express();
    app.use(express.json());
    app.use("/user", require("./4_Interfaces/routes/user.route"));
    return app;

}






module.exports = createApp;