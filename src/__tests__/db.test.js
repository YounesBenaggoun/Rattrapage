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

describe("Authentication", () => {
    let organizerToken;
    let exposerToken;
    let visitorToken;
    it("returns a token for valid login", async () => {
        const response = await request(app)
            .post("/user/login")
            .send({
                email: "younes.benaggoun3@gmail.com",
                password: "12341234",
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });
});
