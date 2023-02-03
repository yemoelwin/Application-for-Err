const path = require('path');

const express = require('express');

const userpostsController = require('../controllers/userposts');

// const rootDir = require('../util/path');

// const { body } = require('express-validator')

const router = express.Router();

router.get('/add-post', userpostsController.getAddPost);

router.post('/add-post', userpostsController.postAddPost);

// router.get('/all-questions', (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'add.post.html'));
// });

// exports.routes = router;
// exports.products = products;
module.exports = router;