const crypto = require("crypto");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// async function main() {
//   let testAccount = await nodeMailer.createTestAccount();
//   let transporter = nodeMailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,  // true for 465, false for other ports
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     }
//   });

//   let info = await transporter.sendMail({
//     from: 'florian.schaden@ethereal.email',
//     to: 'florian.schaden@ethereal.email',
//     subject: 'Your Sign Up Notification',
//     text: 'Your e-mail account has been successfully created.',
//     html: '<h1>Thank You So Much </h1>'
//   });
//   console.log("Message sent: %s", info.messageId);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// }

// main().catch(console.error);

// const transporter = nodeMailer.createTransport(sendgridTransport({
//   auth: {
//     api_key: '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'
//   }
// }));

exports.getLogin = (req, res, next) => {
  // const isloggedin = req.get('cookie').split('=')[1];
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    pageTitle: "signup",
    path: "/signup",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('set-cookie', 'loggedin=true');
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      req.flash("error", "Invalid E-mail address");
      return res.redirect("/login");
    }
    bcrypt
      .compare(password, user.password)
      .then((domatchpassword) => {
        if (domatchpassword) {
          req.session.isloggedin = true;
          req.session.user = user;
          return req.session.save((err) => {
            console.log(err);
            res.redirect("/");
          });
        }
        req.flash("error", "Invalid Password");
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  User.findOne({ email: email })
    .then((userdata) => {
      if (userdata) {
        req.flash("error", "This E-Mail already exists.");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedpassword) => {
          const user = new User({
            email: email,
            password: hashedpassword,
            userpost: { posts: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "This e-mail account does not found.");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: {
      $gt: Date.now(),
    },
  })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        userId: user._id.toString(),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.postLogin = async (req, res, next) => {
//   const user = await User
//     .findOne({
//       email: req.body.email
//     });
//   if (!user)
//     return res
//       .status(400)
//       .send("Email is invalid!");

//   const validPass = await bcrypt
//     .compare(
//       req.body.password,
//       user.password
//     );
//   if (!validPass)
//     return res
//       .status(400)
//       .send("Email and pass do not match!");

// Create and assign a token

//   const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRECT);
//   res.json({ token: token });
// };

// exports.postSignup = async (req, res, next) => {
// Lets Validate The data Before We a user

// Checking if the user is already in the database
// const emailExist = await User
//   .findOne({ email: req.body.email });
// if (emailExist) return res
//   .status(400).send("Email is already exists!");

// Hash Passwords
// const salt = await bcrypt.genSalt(10);
// const hashPassword = await bcrypt.hash(req.body.password, salt);

// Create a new User
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: hashPassword,
//   });
//   try {
//     const savedUser = await user.save();
//     res.redirect('/login', savedUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };
