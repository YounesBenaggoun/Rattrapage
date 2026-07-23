import express from "express";
const router = express.Router();

import { Role } from "../../1_Domain/entities/Role.js";

import expositionController from "../controllers/ExpositionController.js";

import authMiddleware from "../middlewares/auth.Middleware.js";
import roleMiddleware from "../middlewares/role.Middleware.js";

router.post(
    "/add",
    authMiddleware,
    roleMiddleware(Role.ORGANIZER),
    expositionController.add
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(Role.ORGANIZER, Role.EXPOSER),
    expositionController.getAll
);

export default router;