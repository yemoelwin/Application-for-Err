// require("dotenv").config();
// const path = require("path");
// const rootDir = require("../util/path");

const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

const isAuth = require('../middleware/is-auth');

// LOGIN SECTION
router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;
