import express from "express";
import userController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/auth.Middleware.js";
import roleMiddleware from "../middlewares/role.Middleware.js";
import  Role  from "../../1_Domain/entities/Role.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    roleMiddleware(Role.ORGANIZER),
    userController.getAll);

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;