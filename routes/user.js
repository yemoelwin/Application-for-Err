const path = require('path');

const express = require('express');

const useraddpostsController = require('../controllers/user');

// const rootDir = require('../util/path');

// const { body } = require('express-validator')

const router = express.Router();

router.get('/add-post', useraddpostsController.getAddPost);

router.post('/add-post', useraddpostsController.postAddPost);

router.get('/profile', useraddpostsController.getProfilePosts);

router.get('/');

// router.get('/all-questions', (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'add.post.html'));
// });

// exports.routes = router;
// exports.products = products;
module.exports = router;