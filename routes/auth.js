// require("dotenv").config();
const path = require("path");
const express = require("express");
// const rootDir = require("../util/path");
const router = express.Router();
const authController = require("../controllers/auth");

// LOGIN SECTION
router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

// Register

router.get('/signup', authController.getRegister);

router.post('/signup', authController.postRegister);

module.exports = router;
