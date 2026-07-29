import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app.js";



describe.sequential("Test Express RecommendationService", () => {

    test("should return recommendations sorted by score", async () => {

        const res = await request(app)
            .post("/recommendation")
            .send({
                "availableTime": 120,
                "preferences": [
                    "Nature",
                    "Portrait"
                ],
                "address": "6 place lucie Aubrac, 92220 bagneux, france"
            });
        
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        for (let i = 1; i < res.body.length; i++) {
            expect(res.body[i - 1].score)
                .toBeGreaterThanOrEqual(res.body[i].score);
        }

        expect(res.body[0]).toHaveProperty("score");
        expect(res.body[0]).toHaveProperty("distance");
        
    });
});
