import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { USERS } from "../constants.js";
import { authData } from "../setup/auth.data.js";


export default function authorizationTests() {

    test("Organizer can access organizer route", async () => {
        const res = await request(app)
            .get("/exposition")
            .set("Authorization", `Bearer ${authData.organizerToken}`);
        expect(res.statusCode).toBe(200);
    });

    test("Organizer can access User Route and get List Of Users", async () => {
        const res = await request(app)
            .get("/User")
            .set("Authorization", `Bearer ${authData.organizerToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("Exposer can't access organizer route", async () => {
        const res = await request(app)
            .post("/exposition/add")
            .set("Authorization", `Bearer ${authData.exposerToken}`);
        expect(res.statusCode).toBe(403);
    });
    test("Exposer can not access User Route", async () => {
        const res = await request(app)
            .get("/User")
            .set("Authorization", `Bearer ${authData.exposerToken}`);
        expect(res.statusCode).toBe(403);
        expect(res.body.length).toBe(undefined);
    });

    test("Visitor can't access organizer route", async () => {
        const res = await request(app)
            .get("/exposition")
            .set("Authorization", `Bearer ${authData.visitorToken}`);
        expect(res.statusCode).toBe(403);
    });


}