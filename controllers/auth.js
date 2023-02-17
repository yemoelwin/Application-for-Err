const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  // const isloggedin = req.get('cookie').split('=')[1];
  // console.log(req.session.isloggedin);
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'signup',
    path: '/signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('set-cookie', 'loggedin=true');
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
        .then(domatchpassword => {
          if (domatchpassword) {
            req.session.isloggedin = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
        });
    });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  User.findOne({ email: email })
    .then(userdata => {
      if (userdata) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedpassword => {
          const user = new User({
            email: email,
            password: hashedpassword,
            userpost: { posts: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
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
