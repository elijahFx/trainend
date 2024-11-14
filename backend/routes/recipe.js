const express = require("express");

const {
  getAllRecipies,
  addRecipe,
  deleteRecipe,
  editRecipe,
} = require("../controllers/recipeControllers");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, getAllRecipies);

router.post("/", authenticateToken, addRecipe);

router.delete("/:id", authenticateToken, deleteRecipe);

router.patch("/:id", authenticateToken, editRecipe);

module.exports = router;
