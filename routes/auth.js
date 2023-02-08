const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
// const { check, body } = require("express-validator/check");

// LOGIN SECTION
router.get("/login", authController.getLogin);

router.get("/signup", authController.getRegister);

// Register
router.post("/login", authController.postLogin);

router.post("/signup", authController.postRegister);

module.exports = router;
