const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require('./controllers/404');
// Middleware
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const addpostRoutes = require('./routes/add-post');
const indexpostRoutes = require('./routes/indexpost');
const authRoutes = require('./routes/auth');

// const userModels = require('./models/user');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use('/user', addpostData.routes);
app.use('/user', addpostRoutes);
app.use(indexpostRoutes);
app.use(authRoutes);
// app.use("/user", userModels);
// app.use("/api/user", authRoute);

app.use(errorController.get404);

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
