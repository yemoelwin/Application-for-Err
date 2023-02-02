require("dotenv").config();
const path = require("path");
const express = require("express");
const rootDir = require("../util/path");
const { check, body } = require("express-validator/check");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth");

// LOGIN SECTION

router.post("/login", authController.postLogin);

// Register

router.post("/register", authController.postRegister);

module.exports = router;
