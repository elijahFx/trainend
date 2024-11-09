const express = require("express");

const {
  getAddictions,
  addAddiction,
  deleteAllAddictions,
  deleteAddiction,
  editAddiction,
} = require("../controllers/addictionsControllers");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, getAddictions);

router.post("/", authenticateToken, addAddiction);

router.delete("/all", authenticateToken, deleteAllAddictions);

router.delete("/:id", authenticateToken, deleteAddiction);

router.patch("/:id", authenticateToken, editAddiction);

module.exports = router;
