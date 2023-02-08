const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
const postsController = require('../controllers/post');

// const addpostData = require('./add-post');

const router = express.Router();

router.get('/', postsController.getPosts);

router.get('/profile:postId', postsController.getPostDetail);

module.exports = router;        