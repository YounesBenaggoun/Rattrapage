
import app from "./app.js";
import ConnectMongDB from "./3_InfraStructure/config/config.mongo.js";
import Config from "./config.env.js";




const MONGO_URI = Config.MONGO_URI;
const PORT = Config.PORT;


ConnectMongDB(MONGO_URI);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});










