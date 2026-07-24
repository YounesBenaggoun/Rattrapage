import dotenv from "dotenv/config";
import mongoose from "mongoose";

import { describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import Role from "../1_Domain/entities/Role.js";

import UserModel from "../3_InfraStructure/database/models/user.model.js";



// Import ALL models
import "../3_InfraStructure/database/models/user.model.js";
import "../3_InfraStructure/database/models/Theme.model.js";
import "../3_InfraStructure/database/models/Exposition.model.js";
import "../3_InfraStructure/database/models/Reservation.model.js";



beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.asPromise(); // 



});


afterAll(async () => {
    await mongoose.connection.close();
});