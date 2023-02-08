const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/",
  });
};

exports.getRegister = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "signup",
    path: "/",
  });
};

exports.postLogin = (req, res, next) => {
  res.redirect("/");
};

exports.postRegister = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(newUser);
    await newUser.save();
    res.status(201).send(newUser);
  } catch {
    res.status(4000).redirect("/signup");
  }
};
