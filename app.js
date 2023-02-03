const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const addpostData = require("./routes/add-post");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

// Middleware
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());

// const userModels = require('./models/user');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Route Middleware
app.use("/admin", addpostData.routes);
app.use(indexRoutes);
app.use(authRoutes);
// app.use("/user", userModels);
app.use("/api/user", authRoute);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "login" });
});

mongoose
  .connect(
    "mongodb+srv://itvisionhubs:itvisionhub0001xpl@cluster01.kzbsplu.mongodb.net/errorhandling"
  )
  .then((result) => {
    app.listen(
      8080,
      console.log("Do your job right now : http://localhost:8080")
    );
  })
  .catch((err) => console.log(err));
