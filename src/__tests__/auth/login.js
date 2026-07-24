import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";

import { USERS } from "../constants.js";
import { authData } from "../setup/auth.data.js";


export default function loginTests() {

    describe.sequential("Login", () => {

        test("Organizer Login", async () => {

            const res = await request(app)
                .post("/user/login")
                .send({
                    email: USERS.organizer.email,
                    password: USERS.organizer.password
                });

            expect(res.status).toBe(200);

            authData.organizerToken = res.body.token;
        });


        test("Exposer Login", async () => {

            const res = await request(app)
                .post("/user/login")
                .send({
                    email: USERS.exposer.email,
                    password: USERS.exposer.password
                });

            expect(res.status).toBe(200);

            authData.exposerToken = res.body.token;
        });


        test("Visitor Login", async () => {

            const res = await request(app)
                .post("/user/login")
                .send({
                    email: USERS.visitor.email,
                    password: USERS.visitor.password
                });

            expect(res.status).toBe(200);

            authData.visitorToken = res.body.token;
        });

    });
}