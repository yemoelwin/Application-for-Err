const path = require('path');

const express = require('express');

const useraddpostsController = require('../controllers/user');

// const rootDir = require('../util/path');

// const { body } = require('express-validator')

const router = express.Router();

router.get('/add-post', useraddpostsController.getAddPost);

router.get('/profile', useraddpostsController.getProfilePosts);

router.post('/add-post', useraddpostsController.postAddPost);

router.get('/edit-post/:postId', useraddpostsController.getEditPost);

router.post('/edit-post', useraddpostsController.postEditPost);

router.post('/delete-post', useraddpostsController.postDeletePost);



// router.get('/all-questions', (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'add.post.html'));
// });

// exports.routes = router;
// exports.products = products;
module.exports = router;