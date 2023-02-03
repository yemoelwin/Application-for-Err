// const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login'
  });
};

exports.postLogin = async (req, res, next) => {
  const user = await User
    .findOne({
      email: req.body.email
    });
  if (!user)
    return res
      .status(400)
      .send("Email is invalid!");

  const validPass = await bcrypt
    .compare(
      req.body.password,
      user.password
    );
  if (!validPass)
    return res
      .status(400)
      .send("Email and pass do not match!");

  // Create and assign a token

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRECT);
  res.json({ token: token });
};

exports.getRegister = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'signup',
    path: '/signup'
  });
};


exports.postRegister = async (req, res, next) => {
  // Lets Validate The data Before We a user

  // Checking if the user is already in the database
  const emailExist = await User
    .findOne({ email: req.body.email });
  if (emailExist) return res
    .status(400).send("Email is already exists!");

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.redirect('/login', savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};
