import dotenv from "dotenv/config";

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";

import ExpositionRepository from "../3_InfraStructure/Repositories/Exposition.Repository.js";

const MONGO_URI = process.env.MONGO_URI;

beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await mongoose.connection.asPromise(); // ensures fully connected
});

afterAll(async () => {
    await mongoose.disconnect();
});

const expositionRepository = new ExpositionRepository();

describe("Exposition TEST", () => {
    it("should get Adress inSide", async () => {
        const result = await expositionRepository.findById("6a560532cebb4e14ed6b7647");
        console.log(result);
        expect(result).toHaveProperty("adress");

    });
    it("should get the Same id", async () => {
        const result = await expositionRepository.findById("6a560532cebb4e14ed6b7647");
        console.log(result);

        expect(result.id).toBe("6a560532cebb4e14ed6b7647");

    });
});



