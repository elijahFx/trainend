const express = require("express");

const {
    editExerc,
    addExerc,
    getAllExerc,
    deleteAllExerc,
    editExerc
} = require("../controllers/exerControllers")

const router = express.Router();

router.get("/", getAllExerc);

router.post("/", addExerc);

router.delete("/:id", deleteExerc);

router.delete("/all/:id", deleteAllExerc);

router.patch("/:id", editExerc);

module.exports = router;
