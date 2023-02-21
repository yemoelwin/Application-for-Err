// const path = require('path');
// const rootDir = require('../util/path');
// const { body } = require('express-validator')

const express = require('express');

const useraddpostsController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-post', isAuth, useraddpostsController.getAddPost);

router.get('/profile', isAuth, useraddpostsController.getProfilePosts);

router.post('/add-post', isAuth, useraddpostsController.postAddPost);

router.get('/edit-post/:postId', isAuth, useraddpostsController.getEditPost);

router.post('/edit-post', isAuth, useraddpostsController.postEditPost);

router.post('/delete-post', isAuth, useraddpostsController.postDeletePost);



// router.get('/all-questions', (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'add.post.html'));
// });

// exports.routes = router;
// exports.products = products;
module.exports = router;