const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'login.html'));
});

router.post('/login', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'search-error.html'));
    res.redirect('/admin/add-post');
});

router.get('/signup', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'signup.html'));
});

router.post('/signup', (req, res, next) => {
    res.redirect('/login');
});

module.exports = router;