import express from "express";
import userController from "../controllers/UserController.js";

const router = express.Router();

router.get("/", userController.getAll);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;