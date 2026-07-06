import express from "express";
const router = express.Router();

import { Role } from "../../1_Domain/entities/Role.js";

import expositionController from "../controllers/ExpositionController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

router.post(
    "/add",
    authMiddleware,
    roleMiddleware(Role.ORGANIZER),
    expositionController.add
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(Role.ORGANIZER),
    expositionController.getAll
);

export default router;