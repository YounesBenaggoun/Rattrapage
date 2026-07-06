const request = require("supertest");
const app = require("../app.js");


module.exports = () => {
    describe("API", () => {
        test("Unknown route should return 404", async () => {
            const response = await request(app).get("/unknown");

            expect(response.statusCode).toBe(404);
        });
    });
}



