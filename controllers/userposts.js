const products = [];

// exports.getAddPost = (req, res, next) => {
//     res.render('add-post', {
//         pageTitle: 'Add Post',
//         path: '/admin/add-post',
//         // async: true
//         // activeAddPost: true
//     });
// };

exports.postAddPost = (req, res, next) => {
    products.push({ title: req.body.title });
    products.push({ category: req.body.category });
    products.push({ description: req.body.description });
    products.push({ image: req.body.image });
    res.redirect('/');
};



const Post = require('../models/post');
// const post = [];

exports.getAddPost = (req, res, next) => {
    res.render('add-post', {
        pageTitle: 'Add Post',
        path: '/admin/add-post',
        editing: false
    });
};

// exports.postAddPost = (req, res, next) => {
//     const title = req.body.title;
//     const category = req.body.category;
//     const description = req.body.description;
//     const imageUrl = req.body.imageUrl;
//     const post = new Post({
//         title: title,
//         category: category,
//         description: description,
//         imageUrl: imageUrl
//     });
//     post.save()
//         .then(result => {
//             console.log('Created Post');
//             res.redirect('/');
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };

exports.getPosts = (req, res, next) => {
    res.render('index', {
        prods: products,
        pageTitle: 'Index',
        path: '/',
        // hasProducts: products.length > 0,
        // activeShop: true,
        // productCSS: true
    });
};