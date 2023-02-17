const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

const errorController = require("./controllers/error");
const user = require('./models/user');

const MONGODB_URI = "mongodb+srv://itvisionhubs:itvisionhub0001xpl@cluster01.kzbsplu.mongodb.net/postdata";

const app = express();
const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/user");
const postlistRoutes = require("./routes/post-list");
const authRoutes = require("./routes/auth");

// const userModels = require('./models/user');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: 'my secret vip user', resave: false, saveUninitialized: false, store: store }));

app.use((req, res, next) => {
    user.findById('5bab316ce0a7c75f783cb8a8')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});
// app.use('/user', addpostData.routes);
app.use("/user", userRoutes);
app.use(postlistRoutes);
app.use(authRoutes);
// app.use("/user", userModels);
// app.use("/api/user", authRoute);
app.use(errorController.get404);

mongoose
    .connect(
        MONGODB_URI
    )
    .then((result) => {
        app.listen(
            8080,
            console.log("Do your job right now : http://localhost:8080")
        );
    })
    .catch((err) => console.log(err));
