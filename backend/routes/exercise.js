const express = require("express");

const {
  addExerc,
  getAllExerc,
  deleteAllExerc,
  editExerc,
  deleteExerc,
} = require("../controllers/exerControllers");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, getAllExerc);

router.post("/", authenticateToken, addExerc);

router.delete("/all", authenticateToken, deleteAllExerc);

router.delete("/:id", authenticateToken, deleteExerc);

router.patch("/:id", authenticateToken, editExerc);

module.exports = router;
