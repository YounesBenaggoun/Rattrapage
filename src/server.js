


import Config from "./config/env.js";

import ConnectMongDB from "./3_InfraStructure/config/mongoConnect.js";
ConnectMongDB();

import app from "./app.js";

app.listen(Config.PORT, () => {
    console.log(`Server running on port ${Config.PORT}`);
});









