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

    test("ORGANIZER login", async () => {
        const res = await request(app)
            .post("/user/login")
            .send({
                email: "organizer@gmail.com",
                password: "12341234"
            });
        expect(res.status).toBe(200);
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
    test("ُExposer can't access organizer route", async () => {
        const res = await request(app)
            .get("/exposition")
            .set("Authorization", `Bearer ${exposerToken}`);
        expect(res.statusCode).toBe(401);
    });
    test("Visitor can't access organizer route", async () => {
        const res = await request(app)
            .get("/exposition")
            .set("Authorization", `Bearer ${visitorToken}`);
        expect(res.statusCode).toBe(401);
    });
});