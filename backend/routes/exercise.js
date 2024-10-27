const express = require("express");

const {
  addExerc,
  getAllExerc,
  deleteAllExerc,
  editExerc,
  deleteExerc,
} = require("../controllers/exerControllers");

const router = express.Router();

router.get("/", getAllExerc);

router.post("/", addExerc);

router.delete("/all", deleteAllExerc);

router.delete("/:id", deleteExerc);

router.patch("/:id", editExerc);

module.exports = router;
