import dotenv from "dotenv/config";
import mongoose from "mongoose";


// Import ALL models
import "../3_InfraStructure/database/models/user.model.js";
import "../3_InfraStructure/database/models/Exposition.model.js";
import "../3_InfraStructure/database/models/Reservation.model.js";
import "../3_InfraStructure/database/models/Theme.model.js";





beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.asPromise(); // ensures fully connected   
});


beforeEach(async () => {
    // const collections = mongoose.connection.collections;
    // for (const collectionName in collections) {
    //     await collections[collectionName].deleteMany({});
    // }
});


afterAll(async () => {
    await mongoose.connection.close();
});