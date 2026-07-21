import express from "express";
const router = express.Router();

// import { Role } from "../../1_Domain/entities/Role.js";

import recommendationController from "../controllers/recommendationController.js";

// import authMiddleware from "../middlewares/auth.Middleware.js";
// import roleMiddleware from "../middlewares/role.Middleware.js";

router.post(
    "/",
    recommendationController.getRecommendation
);



export default router;