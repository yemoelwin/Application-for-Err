const Post = require('../models/post');
const posts = [];

// exports.getAddPost = (req, res, next) => {
//     res.render('add-post', {
//         pageTitle: 'Add Post',
//         path: '/admin/add-post',
//         // async: true
//         // activeAddPost: true
//     });
// };

exports.postAddPost = (req, res, next) => {
    posts.push({ title: req.body.title });
    posts.push({ category: req.body.category });
    posts.push({ description: req.body.description });
    posts.push({ image: req.body.image });
    res.redirect('/');
};

exports.getAddPost = (req, res, next) => {
    res.render('user/add-post', {
        pageTitle: 'Add Post',
        path: '/user/add-post',
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
    res.render('post/index', {
        prods: posts,
        pageTitle: 'Index',
        path: '/',
        // hasProducts: products.length > 0,
        // activeShop: true,
        // productCSS: true
    });
};