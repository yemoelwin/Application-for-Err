const User = require("../models/user");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Get Users

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/",
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "signup",
    path: "/",
  });
};

// Users Register

exports.postSignup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).json({
          message: `This ${req.body.email} already exit!`,
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({
              error: err.message,
            });
          } else {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
            });
            newUser
              .save()
              .then((result) => {
                res.redirect("/auth/login");
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

// User Login

exports.postLogin = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Not Authorized!" });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            "superSecrect",
            { expiresIn: "1h" }
          );
          res.redirect("/profile");
          // return res
          //   .status(200)
          //   .json({ message: "Auth successful.", token: token });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// Delete Usser with id

exports.deleteUser = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deletd.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
