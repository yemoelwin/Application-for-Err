const Post = require('../models/post');
// const path = require('path');
// const posts = [];

exports.getPosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.render('post/post-list', {
                prods: posts,
                pageTitle: 'All Posts',
                path: '/'
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getPost = (req, res, next) => {
    const prodId = req.params.postId;
    Post.findById(prodId)
        .then(post => {
            res.render('post/post-detail', {
                post: post,
                pageTitle: post.title,
                path: '/post-list'
            });
        })
        .catch(err => console.log(err));
};


