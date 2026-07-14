import express from "express";
import reservationController from "../controllers/ReservationController.js";
import { Role } from "../../1_Domain/entities/Role.js";
import authMiddleware from "../middlewares/auth.Middleware.js";
import roleMiddleware from "../middlewares/role.Middleware.js";



const router = express.Router();


router.post(
    "/add",
    authMiddleware,
    roleMiddleware(Role.VISITOR),
    reservationController.add
)


export default router;