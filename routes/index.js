const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const addpostData = require('./add-post');
const router = express.Router();

router.get('/', (req, res, next) => {
    const products = addpostData.products;
    res.render('index', {
        prods: products,
        pageTitle: 'Index',
        path: '/',
        // hasProducts: products.length > 0,
        // activeShop: true,
        // productCSS: true
    });
});

router.get('/detail', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'detail-page.html'));
});

module.exports = router;        