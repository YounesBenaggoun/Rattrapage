import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { USERS } from "../constants.js";
import { authData } from "../shared/auth.data.js";

import ReservationRepository from "../../3_InfraStructure/Repositories/Reservation.Repository.js";

const reservationRepository = new ReservationRepository();


export default function reservationTest() {


    test("Visitor can add a Reservation", async () => {
        const res = await request(app)
            .post("/reservation/add")
            .send({
                expositionId: authData.expositionId
            })
            .set("Authorization", `Bearer ${authData.visitorToken}`);
        expect(res.statusCode).toBe(201);
        authData.reservationId = res.body._id;
        expect(res.body.visitorId).toBe(authData.visitorId);
        expect(res.body.expositionId).toBe(authData.expositionId);

    });
    
    it("Reservation Delete", async () => {
        const result = await reservationRepository.delete(authData.reservationId);
        expect(result.id).toBe(authData.reservationId);
    });






}