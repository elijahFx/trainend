const express = require("express");

const {
  getEvents,
  addEvent,
  deleteEvent,
  editEvent
} = require("../controllers/eventsControllers");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, getEvents);

router.post("/", authenticateToken, addEvent);

router.delete("/:id", authenticateToken, deleteEvent);

router.patch("/:id", authenticateToken, editEvent);

module.exports = router;
