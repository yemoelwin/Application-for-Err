const path = require('path');

const express = require('express');

const adminController = require('../controllers/post');

const router = express.Router();

router.get('/post', adminController.getPost);

// router.get('/posts', adminController.getPosts);

router.post('/post', adminController.postErrPost);

// router.post('/edit-post/:errorTitleId', adminController.getEditPost);

// router.post('/edit-post', adminController.postEditPost);

// router.post('/delete-post', adminController.postDeletePost);

module.exports = router;
