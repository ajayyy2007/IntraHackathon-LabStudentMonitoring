const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const { login } = require("../controllers/authController");
const validateRequest = require("../middleware/validationMiddleware");
const { loginLimiter } = require("../middleware/rateLimiter");

router.post(
    "/login",
     loginLimiter,
    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),

    validateRequest,

    login
);

module.exports = router;