import dotenv from "dotenv/config";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";

import ReservationRepository from "../../3_InfraStructure/Repositories/Reservation.Repository.js";

import ReservationModel from "../../3_InfraStructure/database/models/Reservation.model.js";
const MONGO_URI = process.env.MONGO_URI;

beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await mongoose.connection.asPromise(); // ensures fully connected
});

afterAll(async () => {
    // await ReservationModel.deleteMany({});
    await mongoose.disconnect();
});

const reservationRepository = new ReservationRepository();

const newReservation = {
    visitorId: "6a56050fcebb4e14ed6b7646",
    expositionId: "6a560532cebb4e14ed6b7647",
    status: true

}
let reservationId;



describe.sequential("Reservation TEST", () => {

    it("Reservation Save", async () => {
        const result = await reservationRepository.save(newReservation);
        reservationId = result.id;
        expect(result.visitorId.toString()).toBe(newReservation.visitorId);
        expect(result.expositionId.toString()).toBe(newReservation.expositionId);
    });

    it("Prevent Duplicate Reservation Save", async () => {
        await expect(
            reservationRepository.save(newReservation)
        ).rejects.toThrow();
        await expect(reservationRepository.save(newReservation)).rejects.toMatchObject({
            code: 11000
        });
    });

    it("Reservation FindOne", async () => {
        const result = await reservationRepository.findOne(newReservation);
        expect(result.visitorId.toString()).toBe(newReservation.visitorId);
        expect(result.expositionId.toString()).toBe(newReservation.expositionId);
    });

    it("Reservation Count by expositionId", async () => {
        const result = await reservationRepository.countReservationByExposition({
            expositionId : newReservation.expositionId
        });
        expect(result).toBeGreaterThan(0);
    });

    it("Reservation Delete", async () => {
        const result = await reservationRepository.delete(reservationId);
        expect(result.id).toBe(reservationId);
    });

});



