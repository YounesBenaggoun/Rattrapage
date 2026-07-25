import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { USERS, EXPOSITION } from "../constants.js";
import { authData } from "../shared/auth.data.js";



export default function expositionTest() {


    test("Exposer  can't create Exposition and get 403", async () => {
        const res = await request(app)
            .post("/exposition/add")
            .send(EXPOSITION)
            .set("Authorization", `Bearer ${authData.exposerToken}`);
        expect(res.statusCode).toBe(403);
    });
    test("Organizer  can create EXPOSITION and get 201 status", async () => {
        EXPOSITION.theme = authData.themeId;
        const res = await request(app)
            .post("/exposition/add")
            .send(EXPOSITION)
            .set("Authorization", `Bearer ${authData.organizerToken}`);
        expect(res.statusCode).toBe(201);
        // console.log(res.body);
        expect(res.body.name).toBe(EXPOSITION.name);
        expect(res.body.description).toBe(EXPOSITION.description);
        authData.expositionId = res.body._id;
        console.log(res.body);
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