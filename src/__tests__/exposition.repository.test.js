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
    let expositionId;
    it("Should Save new Exposition", async () => {
        const jsonExpo = {
            "title": "Nancy",
            "address": "Nancy",
            "description": "des",
            "exposerIds": [
                "6a56050fcebb4e14ed6b7646",
                "6a56050fcebb4e14ed6b7000"
            ],
            "theme": "6a579213a02baa529ee531de",
            "maxVisitor": 3,
            "duration": 45,
            "maxExposer": 2,
            "startDate": "2027-01-01",
            "endDate": "2027-02-02"
        }
        const newExpo = await expositionRepository.save(jsonExpo);
        expositionId = newExpo.id;
        expect(newExpo).toHaveProperty("id");
    });
    const RANDOM_EXPOSER_ID = "6a56050fcebb4e14ed6b6666";
    it("Should add this "+RANDOM_EXPOSER_ID+" as and exposerId", async () => {
        const newExpo = await expositionRepository.addExposerId(expositionId, RANDOM_EXPOSER_ID);
        expect(newExpo).toHaveProperty("exposerIds");
        const exposerIds = newExpo.exposerIds;
        expect(exposerIds.includes(RANDOM_EXPOSER_ID)).toBeTruthy();
    });
    it("Should add this 6a56050fcebb4e14ed6b5555 as and exposerId", async () => {
        const newExpo = await expositionRepository.addExposerId(expositionId, "6a56050fcebb4e14ed6b5555");
        expect(newExpo).toHaveProperty("exposerIds");
        const exposerIds = newExpo.exposerIds;
        expect(exposerIds.includes("6a56050fcebb4e14ed6b5555")).toBeTruthy();
    });
    it("Should Remove One ExposerId 6a56050fcebb4e14ed6b5555", async () => {
        const newExpo = await expositionRepository.removeExposerId(expositionId, "6a56050fcebb4e14ed6b5555");
        expect(newExpo).toHaveProperty("exposerIds");
        const exposerIds = newExpo.exposerIds;
        expect(exposerIds.includes("6a56050fcebb4e14ed6b5555")).toBeFalsy();
    });
    it("Should Delete the Exposition", async () => {
        const deletedExpo = await expositionRepository.delete(expositionId);
        expect(deletedExpo).toHaveProperty("id");
        expect(deletedExpo.id).toBe(expositionId);
    });
});



