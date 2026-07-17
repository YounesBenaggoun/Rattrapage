import express from "express";
import themeController from "../controllers/ThemeController.js";


const router = express.Router();


router.put("/:id", themeController.update);
router.post("/add", themeController.add);
router.get("/", themeController.getAll);

export default router;