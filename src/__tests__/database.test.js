import dotenv from "dotenv/config";
import mongoose from "mongoose";
import { describe, expect, test, beforeAll, afterAll } from "vitest";


const MONGO_URI = process.env.MONGO_URI;


beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await mongoose.connection.asPromise(); // ensures le full connection
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe.sequential("MongoDB connection", () => {
    test("should be connected", () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    test("should have a defined db instance", () => {
        expect(mongoose.connection.db).toBeDefined();
    });
});

;
