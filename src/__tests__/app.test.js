import dotenv from "dotenv";

dotenv.config({
    quiet: true,
});

import { describe, test, it, expect, beforeAll, afterAll } from "vitest";
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

describe("MongoDB connection", () => {
    it("should be connected", () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it("should have a defined db instance", () => {
        expect(mongoose.connection.db).toBeDefined();
    });
});

;
