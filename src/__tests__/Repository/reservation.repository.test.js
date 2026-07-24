import dotenv from "dotenv/config";

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";

import ReservationRepository from "../../3_InfraStructure/Repositories/Reservation.Repository.js";

const MONGO_URI = process.env.MONGO_URI;

beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await mongoose.connection.asPromise(); // ensures fully connected
});

afterAll(async () => {
    await mongoose.disconnect();
});

const reservationRepository = new ReservationRepository();



describe.sequential("Reservation TEST", () => {
    // it("should get address inSide", async () => {
    //     const result = await reservationRepository.countReservationByExposition({
    //         "expositionId": "6a560532cebb4e14ed6b7647"
    //     });
    //     expect(result).toBe(1);
    // });
    // it("Reservation FindOne", async () => {
    //     const result = await reservationRepository.findOne({
    //         visitorId: "6a56050fcebb4e14ed6b7646",
    //         expositionId: "6a560532cebb4e14ed6b7647"
    //     });
    //     
    //     expect(result).toBeFalsy();
    // });
    it("Reservation Save", async () => {
        const result = await reservationRepository.findOne({
            visitorId: "6a56050fcebb4e14ed6b7646",
            expositionId: "6a560532cebb4e14ed6b7647"
        });
        expect(result).toBeFalsy();
    });

});



