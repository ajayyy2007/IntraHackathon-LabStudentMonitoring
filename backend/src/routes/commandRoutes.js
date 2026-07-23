const express = require("express");

const router = express.Router();

const {
    getAllCommands
} = require("../controllers/commandController");

router.get("/", getAllCommands);

module.exports = router;