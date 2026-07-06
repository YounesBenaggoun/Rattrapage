const { describe, test, expect, beforeAll, afterAll } = require("vitest");
const dotenv = require("dotenv");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");

dotenv.config({ quiet: true });


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("API", () => {
    test("Unknown route should return 404", async () => {
        const response = await request(app).get("/unknown");
        expect(response.statusCode).toBe(404);
    });
});

