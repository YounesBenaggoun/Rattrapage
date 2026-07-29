import { describe, expect, afterAll } from "vitest";



import RecommendationConfig from "../../3_InfraStructure/Repositories/RecommendationConfig.Repository.js";
import RecommendationConfigModel from "../../3_InfraStructure/database/models/RecommendationConfig.model.js";









describe.sequential("Test RecommendationConfigRepository", () => {
    let repository;

    beforeEach(async () => {
        repository = new RecommendationConfig();
        await RecommendationConfigModel.deleteMany({});
    });


    it("should create a default config if none exists", async () => {
        const config = await repository.get();
        expect(config).toBeDefined();
        expect(config._id).toBeDefined();

        // Default values
        expect(config.preferenceCoef).toBe(40);
        expect(config.distancePenalty).toBe(0.05);
        expect(config.durationCoef).toBe(20);
        expect(config.crowdPenalty).toBe(0.4);
        expect(config.availableSlotsCoef).toBe(2);

        const count = await RecommendationConfigModel.countDocuments();
        expect(count).toBe(1);
    });
    it("should return existing config", async () => {
        const created = await RecommendationConfigModel.create({
            preferenceCoef: 100,
            distancePenalty: 1,
            durationCoef: 50,
            crowdPenalty: 3,
            availableSlotsCoef: 10,
        });

        const config = await repository.get();

        expect(config._id.toString()).toBe(created._id.toString());
        expect(config.preferenceCoef).toBe(100);
        expect(config.distancePenalty).toBe(1);
        expect(config.durationCoef).toBe(50);
        expect(config.crowdPenalty).toBe(3);
        expect(config.availableSlotsCoef).toBe(10);

        const count = await RecommendationConfigModel.countDocuments();
        expect(count).toBe(1);
    });

    it("should update existing config", async () => {
        await RecommendationConfigModel.create({});

        const updated = await repository.update({
            preferenceCoef: 75,
            durationCoef: 30,
        });

        expect(updated.preferenceCoef).toBe(75);
        expect(updated.durationCoef).toBe(30);

        const dbConfig = await RecommendationConfigModel.findOne();

        expect(dbConfig.preferenceCoef).toBe(75);
        expect(dbConfig.durationCoef).toBe(30);
    });
    it("should create config if update is called with no document", async () => {
        const updated = await repository.update({
            preferenceCoef: 90,
        });

        expect(updated).toBeDefined();
        expect(updated.preferenceCoef).toBe(90);

        const count = await RecommendationConfigModel.countDocuments();
        expect(count).toBe(1);
    });
    it("should only update provided fields", async () => {
        await RecommendationConfigModel.create({
            preferenceCoef: 40,
            distancePenalty: 0.05,
            durationCoef: 20,
            crowdPenalty: 0.4,
            availableSlotsCoef: 2,
        });

        await repository.update({
            durationCoef: 99,
        });

        const config = await RecommendationConfigModel.findOne().lean();

        expect(config.preferenceCoef).toBe(40);
        expect(config.distancePenalty).toBe(0.05);
        expect(config.durationCoef).toBe(99);
        expect(config.crowdPenalty).toBe(0.4);
        expect(config.availableSlotsCoef).toBe(2);
    });
    it("should throw when validation fails", async () => {
        await RecommendationConfigModel.create({});
        await expect(
            repository.update({
                preferenceCoef: -1,
            })
        ).rejects.toThrow();
    });

});