const express = require("express");
const router = express.Router();
const { Role } = require("../../1_Domain/entities/Role");

const expositionController = require("../controllers/ExpositionController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


router.post(
    "/add", 
    authMiddleware, 
    roleMiddleware(Role.VISITOR), 
    expositionController.add
);

module.exports = router;
