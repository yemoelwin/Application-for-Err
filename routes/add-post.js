const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
// const { body } = require('express-validator')

// const adminController = require('../controllers/admin');

const router = express.Router();
const products = [];

router.get('/add-post', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-post.html'));
});

router.post('/add-post', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

// router.get('/all-questions', (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'add.post.html'));
// });

// module.exports = router;
exports.routes = router;
exports.products = products;