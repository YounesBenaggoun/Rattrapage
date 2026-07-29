import { describe, it, expect, vi, beforeEach } from "vitest";
import RecommendationService from "../../1_Domain/services/RecommendationService.js";
import recommendationConfig from "../../3_InfraStructure/config/recommendation.config.js";

describe("RecommendationService.calculateScore", () => {
    let service;

    beforeEach(() => {
        const fakeDistanceService = vi.fn().mockResolvedValue(10);

        service = new RecommendationService(
            recommendationConfig,
            fakeDistanceService
        );
    });

    it("should calculate the correct score", async () => {
        const visitor = {
            address: "Paris",
            preferences: ["Cuisine"],
            availableTime: 120
        };

        const exposition = {
            id: "6a69d00425a3f5b363ba646b",
            address: "Paris",
            theme: {
                name: "Cuisine"
            },
            duration: 60,
            maxVisitor: 100,
            reservationCount: 20
        };

        const result = await service.calculateScore({
            visitor,
            exposition
        });

        expect(result.distance).toBe(10);

        /**
         * preference = 40
         * duration = 20
         * distance = -0.5
         * crowd = -8
         * slots = +160
         * business = +25
         * low crowd = +15
         * near = +10
         *
         * total = 261.5
         */

        expect(result.score).toBeCloseTo(261.5);
    });

    it("should return score 0 when distance is greater than maxDistance", async () => {

        const distanceService = vi.fn().mockResolvedValue(100);

        const service = new RecommendationService(
            recommendationConfig,
            distanceService
        );

        const visitor = {
            address: "Paris",
            preferences: ["Cuisine"],
            availableTime: 120
        };

        const exposition = {
            id: "1",
            address: "Lyon",
            theme: {
                name: "Cuisine"
            },
            duration: 30,
            maxVisitor: 20,
            reservationCount: 5
        };

        const result = await service.calculateScore({
            visitor,
            exposition
        });

        expect(result.score).toBe(0);
    });

    it("should not add preference bonus", async () => {

        const visitor = {
            address: "Paris",
            preferences: ["Art"],
            availableTime: 120
        };

        const exposition = {
            id: "1",
            address: "Paris",
            theme: {
                name: "Cuisine"
            },
            duration: 30,
            maxVisitor: 20,
            reservationCount: 5
        };

        const result = await service.calculateScore({
            visitor,
            exposition
        });

        expect(result.score).toBeLessThan(100);
    });
});


describe("RecommendationService.all", () => {

    it("should sort expositions by score", async () => {

        const distanceService = vi
            .fn()
            .mockResolvedValue(10);

        const service = new RecommendationService(
            recommendationConfig,
            distanceService
        );

        const visitor = {
            address: "Paris",
            preferences: ["Cuisine"],
            availableTime: 120
        };

        const expositions = [
            {
                id: "1",
                title: "Expo 1",
                address: "Paris",
                theme: { name: "Cuisine" },
                duration: 60,
                maxVisitor: 100,
                reservationCount: 20
            },
            {
                id: "2",
                title: "Expo 2",
                address: "Paris",
                theme: { name: "Art" },
                duration: 60,
                maxVisitor: 100,
                reservationCount: 80
            }
        ];

        const result = await service.all(visitor, expositions);

        expect(result).toHaveLength(2);

        expect(result[0].score).toBeGreaterThan(result[1].score);

        expect(result[0].title).toBe("Expo 1");
    });
});