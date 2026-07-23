

import { describe, it, expect  } from "vitest";

import ExpositionRepository from "../3_InfraStructure/Repositories/Exposition.Repository.js";



const expositionRepository = new ExpositionRepository();

let expositionId;
const RANDOM_EXPOSER_ID = "6a56050fcebb4e14ed6b6666";
const SECOND_RANDOM_EXPOSER_ID = "6a56050fcebb4e14ed6b7000";

const TEST_JSON_EXPOSITION = {
    "title": "Nancy",
    "address": "Nancy",
    "description": "des",
    "exposerIds": [
        SECOND_RANDOM_EXPOSER_ID
    ],
    "theme": "6a579213a02baa529ee531de",
    "maxVisitor": 3,
    "duration": 45,
    "maxExposer": 2,
    "startDate": "2027-01-01",
    "endDate": "2027-02-02"
}

// ADD EXPOSITION 
describe("Exposition TEST With Exposer", () => {
    it("Should Save new Exposition with exposerId " + SECOND_RANDOM_EXPOSER_ID, async () => {
        const newExpo = await expositionRepository.save(TEST_JSON_EXPOSITION);
        expositionId = newExpo.id;
        expect(newExpo).toHaveProperty("id");
    });

    // ADD EXPOSER 

    it("Should add this exposerId " + RANDOM_EXPOSER_ID + " as and exposerIds", async () => {
        const newExpo = await expositionRepository.addExposerId(expositionId, RANDOM_EXPOSER_ID);
        expect(newExpo).toHaveProperty("exposerIds");
        const exposerIds = newExpo.exposerIds;
        expect(exposerIds.includes(RANDOM_EXPOSER_ID)).toBeTruthy();
    });

    // ADD SECOND EXPOSER 

    it("Should add this second exposerId " + SECOND_RANDOM_EXPOSER_ID + " as and exposerIds", async () => {
        const newExpo = await expositionRepository.addExposerId(expositionId, SECOND_RANDOM_EXPOSER_ID);
        expect(newExpo).toHaveProperty("exposerIds");
        const exposerIds = newExpo.exposerIds;
        expect(exposerIds.includes(SECOND_RANDOM_EXPOSER_ID)).toBeTruthy();
    });

    // GET LIST BY EXPOSITION BY EXPOSER ID

    it("Should get List by exposerId", async () => {
        const list = await expositionRepository.findExpositionByExposerId(RANDOM_EXPOSER_ID);
        expect(list.length).toBeGreaterThanOrEqual(1);
    });
})


describe("Exposition TEST", () => {
    // ///////////////////////////////////////////////
    // REMOVE EXPOSER ID 
    // ///////////////////////////////////////////////

    it("Should Remove this ExposerId " + SECOND_RANDOM_EXPOSER_ID, async () => {
        const newExpo = await expositionRepository.removeExposerId(expositionId, SECOND_RANDOM_EXPOSER_ID);
        expect(newExpo).toHaveProperty("exposerIds");
        const exposerIds = newExpo.exposerIds;
        expect(exposerIds.includes(SECOND_RANDOM_EXPOSER_ID)).toBeFalsy();
    });

    // ///////////////////////////////////////////////
    // REMOVE ALL THE EXPOSITIONI 
    // ///////////////////////////////////////////////
    it("Should Delete the Exposition", async () => {
        const deletedExpo = await expositionRepository.delete(expositionId);
        expect(deletedExpo).toHaveProperty("id");
        expect(deletedExpo.id).toBe(expositionId);
    });
});



