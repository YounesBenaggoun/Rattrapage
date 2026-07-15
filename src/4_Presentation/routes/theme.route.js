import express from "express";
import themeController from "../controllers/ThemeController.js";

const router = express.Router();


router.post("/add", themeController.add);

export default router;