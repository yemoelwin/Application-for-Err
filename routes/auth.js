// require("dotenv").config();
// const path = require("path");
// const rootDir = require("../util/path");

const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");
// const { check, body } = require("express-validator/check");

<<<<<<< HEAD
const isAuth = require("../middleware/is-auth");
=======
const { check, body } = require('express-validator');

const User = require('../models/user');
>>>>>>> 037585d3fce4e51afabd02c3b2b25c1151f11cbe

// LOGIN SECTION
router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

<<<<<<< HEAD
router.post("/login", authController.postLogin);

router.post("/signup", authController.postSignup);
=======
router.post('/login',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email address')
            .normalizeEmail(),
        body('password', 'Invalid Password.')
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ], authController.postLogin);

router.post('/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req, location }) => {
                // if (value === 'test@test.com') {
                //     throw new Error('This email address is forbidden.');
                // }
                // return true;
                return User.findOne({ email: value })
                    .then(userdata => {
                        if (userdata) {
                            return Promise.reject('This E-Mail already exists.');
                        }
                    });
            })
            .normalizeEmail(),
        body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
            .isLength({ min: 5 })
            // .withMessage('Please enter a password with only numbers and text and at least 5 characters')
            .isAlphanumeric()
            .trim(),
        body('confirmpassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Your passwords do not match!');
                }
                return true;
            })
            .trim()
    ], authController.postSignup);
>>>>>>> 037585d3fce4e51afabd02c3b2b25c1151f11cbe

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

module.exports = router;
