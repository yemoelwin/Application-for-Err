const path = require("path");
const express = require("express");
const rootDir = require("../util/path");
const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.render("signup", {
    pageTitle: "SignUp",
    path: "/signup",
  });
});

router.get("/login", (req, res, next) => {
  res.render("login", {
    pageTitle: "Login",
    path: "/login",
  });
});

// router.post("/login", (req, res) => {});

router.post("/register", (req, res, next) => {
  res.send("Register");
});

module.exports = router;
