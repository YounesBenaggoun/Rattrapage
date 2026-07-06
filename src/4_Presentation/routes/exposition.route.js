const express = require("express");
const router = express.Router();
const { Role } = require("../../1_Domain/entities/Role");

const expositionController = require("../controllers/ExpositionController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


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

module.exports = router;
