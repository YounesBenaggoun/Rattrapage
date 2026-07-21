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
const expositionId = "6a5a74a61e268508a4db895e";

describe("Exposition TEST", () => {
    it("should get address inSide", async () => {
        const result = await expositionRepository.findById(expositionId);
        console.log(result);
        // expect(result).toHaveProperty("address");

    });
    // it("should get the Same id", async () => {
    //     const result = await expositionRepository.findById(expositionId);
    //     console.log(result);


    //     expect(result.id).toBe(expositionId);

    // });
});



