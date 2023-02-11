const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
// const { check, body } = require("express-validator/check");

// LOGIN SECTION
router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

// Register
router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.delete("/:userId", authController.deleteUser);

module.exports = router;
