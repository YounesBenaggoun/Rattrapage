

const ConnectMongDB = require("./3_InfraStructure/config/mongoConnect.js");
const Config = require("./config/env.js");


const createApp = require("./app.js");



async function start() {
    await ConnectMongDB();
    const app = createApp();
    app.listen(Config.PORT, () => {
        console.log(`Server running on port ${Config.PORT}`);
    });
}

start();






