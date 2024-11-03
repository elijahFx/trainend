const express = require("express");

const {
  getAddictions,
  addAddiction,
  deleteAllAddictions,
  deleteAddiction,
  editAddiction,
} = require("../controllers/addictionsControllers");

const router = express.Router();

router.get("/", getAddictions);

router.post("/", addAddiction);

router.delete("/all", deleteAllAddictions);

router.delete("/:id", deleteAddiction);

router.patch("/:id", editAddiction);

module.exports = router;
