


const Config = require("./config/env.js");


const app = require("./app.js");






app.listen(Config.PORT, () => {
    console.log(`Server running on port ${Config.PORT}`);
});










