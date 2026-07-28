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
    test("Organizer  can DELETE Theme and get 201 status", async () => {
        const themeId = authData.themeId;
        const deleteRes = await request(app)
            .delete(`/theme/${themeId}`)
            .set("Authorization", `Bearer ${authData.organizerToken}`);

        expect(deleteRes.statusCode).toBe(200);
        expect(deleteRes.body.message).toBe("Deleted");
        expect(deleteRes.body.theme._id).toBe(authData.themeId);
    });
}