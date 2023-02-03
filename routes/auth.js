require("dotenv").config();
const path = require("path");
const express = require("express");
const rootDir = require("../util/path");
const router = express.Router();
const authController = require("../controllers/auth");

// LOGIN SECTION

router.post("/login", authController.postLogin);

// Register

router.post("/register", authController.postRegister);

module.exports = router;
