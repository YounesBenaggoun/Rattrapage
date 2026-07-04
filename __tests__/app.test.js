
require('dotenv').config();
// jest.setTimeout(30000);

const request = require("supertest");
const app = require("../src/app.js");

const mongoose = require("mongoose");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.disconnect();
});





describe("Express API", () => {
    // test("GET / should return Hello Express!", async () => {
    //     const response = await request(app).get("/");

    //     expect(response.statusCode).toBe(200);
    //     // expect(response.text).toBe("Hello Express!");
    // });

    // test("GET /api should return JSON", async () => {
    //     const response = await request(app).get("/api");
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toEqual({
    //         success: true,
    //         message: "API OK"
    //     });
    // });
    // test("Retour 201", async () => {
    //     const response = await request(app).get("/user/");
    //     expect(response.statusCode).toBe(201);
    //     expect(response.statusCode).toBe(200);
    // });

    test("Unknown route should return 404", async () => {
        const response = await request(app).get("/unknown");

        expect(response.statusCode).toBe(404);
    });
});