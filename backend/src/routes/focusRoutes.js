const express = require("express");
const router = express.Router();

const {
    getFocusScores
} = require("../controllers/focusController");

router.get("/", getFocusScores);

module.exports = router;