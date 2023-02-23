// const path = require('path');
// const rootDir = require('../util/path');

const express = require('express');

const useraddpostsController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

const { body } = require('express-validator');

const router = express.Router();

router.get('/add-post', isAuth, useraddpostsController.getAddPost);

router.get('/profile', isAuth, useraddpostsController.getProfilePosts);

router.post('/add-post', isAuth,
    [
        body('title')
            .isString()
            .isLength({ min: 6 })
            .trim(),
        body('category')
            .isAlphanumeric(),
        body('description')
            .isLength({ min: 5, max: 600 })
            .trim(),
        body('imageUrl')
            .isURL()

    ], useraddpostsController.postAddPost);

router.get('/edit-post/:postId', isAuth, useraddpostsController.getEditPost);

router.post('/edit-post', isAuth, useraddpostsController.postEditPost);

router.post('/delete-post', isAuth, useraddpostsController.postDeletePost);



// router.get('/all-questions', (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'add.post.html'));
// });

// exports.routes = router;
// exports.products = products;
module.exports = router;