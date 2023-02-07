const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/404");
// Middleware
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

<<<<<<< HEAD
const userRoutes = require("./routes/user");
const postlistRoutes = require("./routes/post-list");
const authRoutes = require("./routes/auth");
=======
const userRoutes = require('./routes/user');
const postlistRoutes = require('./routes/post-list');
const authRoutes = require('./routes/auth');
>>>>>>> e5121a08dd1a2b967ea6e876bf2625e426dc5441

// const userModels = require('./models/user');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use('/user', addpostData.routes);
<<<<<<< HEAD
app.use("/user", userRoutes);
=======
app.use('/user', userRoutes);
>>>>>>> e5121a08dd1a2b967ea6e876bf2625e426dc5441
app.use(postlistRoutes);
app.use(authRoutes);
// app.use("/user", userModels);
// app.use("/api/user", authRoute);

app.use(errorController.get404);

mongoose
<<<<<<< HEAD
  .connect(
    "mongodb+srv://itvisionhubs:itvisionhub0001xpl@cluster01.kzbsplu.mongodb.net/postdata"
  )
  .then((result) => {
    app.listen(
      8080,
      console.log("Do your job right now : http://localhost:8080")
    );
  })
  .catch((err) => console.log(err));
=======
    .connect(
        "mongodb+srv://itvisionhubs:itvisionhub0001xpl@cluster01.kzbsplu.mongodb.net/postdata"
    )
    .then((result) => {
        app.listen(
            8080,
            console.log("Do your job right now : http://localhost:8080")
        );
    })
    .catch((err) => console.log(err));
>>>>>>> e5121a08dd1a2b967ea6e876bf2625e426dc5441
