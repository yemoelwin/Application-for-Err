const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require('multer');

const errorController = require("./controllers/error");
const user = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://itvisionhubs:itvisionhub0001xpl@cluster01.kzbsplu.mongodb.net/postdata";

const app = express();
const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csrfProtection = csrf();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString() + '-' + file.originalname);
    cb(null, file.filename + '-' + file.originalname);
  }
});

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/user");
const postlistRoutes = require("./routes/post-list");
const authRoutes = require("./routes/auth");
// const { deleteUser } = require("./controllers/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: "my secret vip user",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  user
    .findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isloggedin;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/user", userRoutes);
app.use(postlistRoutes);
app.use(authRoutes);
// app.use("/user", userModels);
// app.use("/api/user", authRoute);
app.use(errorController.get404);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(
      8080,
      console.log("Do your job right now : http://localhost:8080")
    );
  })
  .catch((err) => console.log(err));
