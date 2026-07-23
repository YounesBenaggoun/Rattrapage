import dotenv from "dotenv/config";
import { describe, test, expect, beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";

const MONGO_URI = process.env.MONGO_URI;

beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await mongoose.connection.asPromise(); // ensures fully connected
});
afterAll(async () => {
    await mongoose.disconnect();
});

describe("Authentication", () => {
    let organizerToken;
    let visitorToken;
    let exposerToken;

    

    
});