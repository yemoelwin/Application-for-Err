const Post = require('../models/post');
const path = require('path');
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

exports.getProfilePosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.render('post/profile', {
                prods: posts,
                pageTitle: 'Your Posts',
                path: '/profile'
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getPostDetail = (res, req, next) => {
    const prodId = req.params.postId;
    Post.findById(prodId)
        .then(post => {
            res.render('post/detail-page', {
                post: post,
                pageTitle: post.title,
                path: '/detail-page'
            });
        })
        .catch(err => {
            console.log(err);
        });
};


