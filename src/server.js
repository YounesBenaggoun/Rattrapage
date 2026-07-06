


const Config = require("./config/env.js");

const ConnectMongDB = require("./3_InfraStructure/config/mongoConnect");
ConnectMongDB();


const app = require("./app.js");



app.listen(Config.PORT, () => {
    console.log(`Server running on port ${Config.PORT}`);
});










