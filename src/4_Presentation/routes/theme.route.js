import express from "express";
import themeController from "../controllers/ThemeController.js";
import authMiddleware from "../middlewares/auth.Middleware.js";
import roleMiddleware from "../middlewares/role.Middleware.js";
import { Role } from "../../1_Domain/entities/Role.js";


const router = express.Router();


router.put("/:id",
    authMiddleware,
    roleMiddleware(Role.ORGANIZER),
    themeController.update);
router.post("/add",
    authMiddleware,
    roleMiddleware(Role.ORGANIZER),
    themeController.add);
router.get("/", themeController.getAll);

export default router;