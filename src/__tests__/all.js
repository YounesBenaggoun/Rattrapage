
require('dotenv').config({
    quiet: true,
});


const request = require("supertest");
const app = require("../app.js");
const mongoose = require("mongoose");


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

describe("Authentication", () => {
    let organizerToken;
    let exposerToken;
    let visitorToken;
    test("ORGANIZER login", async () => {
        const res = await request(app)
            .post("/user/login")
            .send({
                email: "younes.benaggoun3@gmail.com",
                password: "12341234",
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.user.role).toBe("organizer");

        organizerToken = res.body.token;
    });
    test("Exposer login", async () => {
        const res = await request(app)
            .post("/user/login")
            .send({
                email: "exposer@gmail.com",
                password: "12341234",
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.user.role).toBe("exposer");

        exposerToken = res.body.token;
    });
    test("Visitor login", async () => {
        const res = await request(app)
            .post("/user/login")
            .send({
                email: "visitor@gmail.com",
                password: "12341234",
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.user.role).toBe("visitor");

        visitorToken = res.body.token;
    });
    test("Organizer can access organizer route", async () => {
        const res = await request(app)
            .get("/exposition")
            .set("Authorization", `Bearer ${organizerToken}`);

        expect(res.statusCode).toBe(200);
    });
    test("Visitor can't access organizer route", async () => {
        const res = await request(app)
            .get("/exposition")
            .set("Authorization", `Bearer ${visitorToken}`);


        expect(res.statusCode).toBe(401);
    });

})