


import Config from "./config/env.js";

const MONGO_URI = process.env.MONGO_URI;

import ConnectMongDB from "./3_InfraStructure/config/mongoConnect.js";
ConnectMongDB(MONGO_URI);

import app from "./app.js";

app.listen(Config.PORT, () => {
    console.log(`Server running on port ${Config.PORT}`);
});









