const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
const postsController = require('../controllers/post');

const isAuth = require('../middleware/is-auth');
// const addpostData = require('./add-post');

const router = express.Router();

router.get('/', postsController.getPosts);

router.get('/post-list/:postId', isAuth, postsController.getPost);

module.exports = router;        