const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
const userpostsController = require('../controllers/userposts');

// const addpostData = require('./add-post');

const router = express.Router();

router.get('/', userpostsController.getPosts);

router.get('/detail', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'detail-page.html'));
});

module.exports = router;        