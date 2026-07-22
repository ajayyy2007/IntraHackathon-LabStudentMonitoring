const express = require("express");

const router = express.Router();

const {
    getScreenshots,
    getStudentScreenshot
} = require("../controllers/screenshotController");

router.get("/", getScreenshots);

router.get("/:studentId", getStudentScreenshot);

module.exports = router;