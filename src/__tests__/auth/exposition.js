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
  
        expect(res.body.name).toBe(EXPOSITION.name);
        expect(res.body.description).toBe(EXPOSITION.description);
        authData.expositionId = res.body._id;
 
    });
    

  


}