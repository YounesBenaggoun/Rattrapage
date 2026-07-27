import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { USERS, THEME } from "../constants.js";
import { authData } from "../shared/auth.data.js";


export default function themeTests() {
    test("Exposer  can't create Theme and get 403", async () => {
        const res = await request(app)
            .post("/theme/add")
            .send(THEME)
            .set("Authorization", `Bearer ${authData.exposerToken}`);
        expect(res.statusCode).toBe(403);
    });
    test("Organizer  can create Theme and get 201 status", async () => {
        const res = await request(app)
            .post("/theme/add")
            .send(THEME)
            .set("Authorization", `Bearer ${authData.organizerToken}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(THEME.name);
        expect(res.body.description).toBe(THEME.description);
        authData.themeId = res.body._id;
    });

    // test("Organizer can access User Route and get List Of Users", async () => {
    //     const res = await request(app)
    //         .get("/User")
    //         .set("Authorization", `Bearer ${authData.organizerToken}`);
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.length).toBeGreaterThan(0);
    // });

    // test("Exposer can't access organizer route", async () => {
    //     const res = await request(app)
    //         .post("/exposition/add")
    //         .set("Authorization", `Bearer ${authData.exposerToken}`);
    //     expect(res.statusCode).toBe(403);
    // });
    // test("Exposer can not access User Route", async () => {
    //     const res = await request(app)
    //         .get("/User")
    //         .set("Authorization", `Bearer ${authData.exposerToken}`);
    //     expect(res.statusCode).toBe(403);
    //     expect(res.body.length).toBe(undefined);
    // });

    // test("Visitor can't access organizer route", async () => {
    //     const res = await request(app)
    //         .get("/exposition")
    //         .set("Authorization", `Bearer ${authData.visitorToken}`);
    //     expect(res.statusCode).toBe(403);
    // });


}