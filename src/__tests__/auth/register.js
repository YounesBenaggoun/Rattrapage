import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";


import { USERS } from "../constants.js";
import { authData } from "../setup/auth.data.js";


export default function registerTest() {



    describe.sequential("Register", () => {
        test("Register Organizer", async () => {
            const res = await request(app)
                .post("/user/register")
                .send(USERS.organizer);
            expect(res.status).toBe(201);
            authData.organizerId = res.body.user._id;
        });

        test("Duplicate Organizer", async () => {
            const res = await request(app)
                .post("/user/register")
                .send(USERS.organizer);
            expect(res.status).toBe(409);
        });

        test("Register Exposer", async () => {

            const res = await request(app)
                .post("/user/register")
                .send(USERS.exposer);

            expect(res.status).toBe(201);

            authData.exposerId = res.body.user._id;
        });

        test("Register Visitor", async () => {

            const res = await request(app)
                .post("/user/register")
                .send(USERS.visitor);
            expect(res.status).toBe(201);
            authData.visitorId = res.body.user._id;
        });
    });


}

