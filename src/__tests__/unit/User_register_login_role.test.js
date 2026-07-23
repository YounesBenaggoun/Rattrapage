import { describe, expect, afterAll } from "vitest";


import request from "supertest";
import app from "../../app.js";
import UserModel from "../../3_InfraStructure/database/models/user.model.js";
import Role from "../../1_Domain/entities/Role.js";

import mongoose from "mongoose";

// Before All script in the Setup.js in Vitest.config.json




let organizerToken;
let exposerToken;
let visitorToken;

let organizerId;
let exposerId;
let visitorId;

const ORGANIZER_EMAIL = "organizerTest@gmail.com";
const EXPOSER_EMAIL = "exposerTest@gmail.com";
const VISITOR_EMAIL = "visitorTest@gmail.com";
const PASSWORD = "12341234";


describe("Register", () => {
    test("Register Organizer", async () => {
        const res = await request(app)
            .post("/user/register")
            .send({
                email: ORGANIZER_EMAIL,
                password: PASSWORD,
                name: "myTestOrganizer",
                role: Role.ORGANIZER
            });
        expect(res.status).toBe(201);
        expect(res.body.user.role).toBe(Role.ORGANIZER);
        organizerId = res.body.user._id;
    });
    test("Duplicate Register Organizer", async () => {
        const res = await request(app)
            .post("/user/register")
            .send({
                email: ORGANIZER_EMAIL,
                password: PASSWORD,
                name: "myTestOrganizer",
                role: Role.ORGANIZER
            });
        expect(res.status).toBe(409);
        expect(res.body.message).toBe("A user with this email already exists");
    });
    test("Register Exposer", async () => {
        const res = await request(app)
            .post("/user/register")
            .send({
                email: EXPOSER_EMAIL,
                password: PASSWORD,
                name: "myTest",
                role: Role.EXPOSER
            });
        expect(res.status).toBe(201);
        expect(res.body.user.role).toBe(Role.EXPOSER);
        exposerId = res.body.user._id;
    });
    test("Register Visitor", async () => {
        const res = await request(app)
            .post("/user/register")
            .send({
                email: VISITOR_EMAIL,
                password: PASSWORD,
                name: "myTest",
                role: Role.VISITOR
            });
        expect(res.status).toBe(201);
        expect(res.body.user.role).toBe(Role.VISITOR);
        visitorId = res.body.user._id;
    });
    test("ORGANIZER login", async () => {
        const res = await request(app)
            .post("/user/login")
            .send({
                email: ORGANIZER_EMAIL,
                password: PASSWORD
            });
        expect(res.status).toBe(200);
        expect(res.body.user.role).toBe(Role.ORGANIZER);
        organizerToken = res.body.token;
    });

    test("Exposer login", async () => {
        const res = await request(app)
            .post("/user/login")
            .send({
                email: EXPOSER_EMAIL,
                password: PASSWORD,
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.user.role).toBe(Role.EXPOSER);
        exposerToken = res.body.token;
    });

    test("Visitor login", async () => {
        const res = await request(app)
            .post("/user/login")
            .send({
                email: VISITOR_EMAIL,
                password: PASSWORD,
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.user.role).toBe(Role.VISITOR);
        visitorToken = res.body.token;
    });

    test("Organizer can access organizer route", async () => {
        const res = await request(app)
            .get("/exposition")
            .set("Authorization", `Bearer ${organizerToken}`);
        expect(res.statusCode).toBe(200);
    });

    test("Organizer can access User Route and get List Of Users", async () => {
        const res = await request(app)
            .get("/User")
            .set("Authorization", `Bearer ${organizerToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("Exposer can't access organizer route", async () => {
        const res = await request(app)
            .post("/exposition/add")
            .set("Authorization", `Bearer ${exposerToken}`);
        expect(res.statusCode).toBe(403);
    });
    test("Exposer can not access User Route", async () => {
        const res = await request(app)
            .get("/User")
            .set("Authorization", `Bearer ${exposerToken}`);
        expect(res.statusCode).toBe(403);
        expect(res.body.length).toBe(undefined);
    });

    test("Visitor can't access organizer route", async () => {
        const res = await request(app)
            .get("/exposition")
            .set("Authorization", `Bearer ${visitorToken}`);
        expect(res.statusCode).toBe(403);
    });
});




afterAll(async () => {
    await UserModel.findByIdAndDelete(organizerId);
    await UserModel.findByIdAndDelete(exposerId);
    await UserModel.findByIdAndDelete(visitorId);
});