import dotenv from "dotenv";
import ThemeRepository from "../3_InfraStructure/Repositories/Theme.Repository";

dotenv.config({
    quiet: true,
});

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";


// import app from "../app.js";




const MONGO_URI = process.env.MONGO_URI;

beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await mongoose.connection.asPromise(); // ensures fully connected
});

afterAll(async () => {
    await mongoose.disconnect();
});


describe("Test Theme Repository", () => {
    const themeRepository = new ThemeRepository();

    // it("Theme Create", async () => {
    //     const result = await themeRepository.create({
    //         "name": "younes",
    //         "description": "younes Description"
    //     });
    //     console.log(result);
    //     expect(result).toBeFalsy();
    // });
    it("Theme Create", async () => {
        const result = await themeRepository.update("6a5a236e401cad1734e9c24e",
            {
                "name": "younes modif",
                "description": "younes Description"
            });
        console.log(result);
        // expect(result).toBeFalsy();
    });
    it("Theme Remove", async () => {
        const result = await themeRepository.delete("6a5a236e401cad1734e9c24e");
        console.log(result);
        // expect(result).toBeFalsy();
    });

});