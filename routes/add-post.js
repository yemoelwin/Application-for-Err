const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
// const { body } = require('express-validator')

// const adminController = require('../controllers/admin');

const router = express.Router();
const products = [];

router.get('/add-post', (req, res, next) => {
    res.render('add-post', {
        pageTitle: 'Add Post',
        path: '/admin/add-post',
        // async: true
        // activeAddPost: true
    });
});

router.post('/add-post', (req, res, next) => {
    products.push({ title: req.body.title });
    products.push({ category: req.body.category });
    products.push({ image: req.body.image });
    products.push({ description: req.body.description });
    res.redirect('/');
});

// router.get('/all-questions', (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'add.post.html'));
// });

exports.routes = router;
exports.products = products;