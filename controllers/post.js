const Post = require('../models/post');
// const posts = [];

exports.getAddPost = (req, res, next) => {
    res.render('user/add-post', {
        pageTitle: 'Add Post',
        path: '/user/add-post',
        editing: false
    });
};

exports.postAddPost = (req, res, next) => {
    const title = req.body.title;
    // const category = req.body.category;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const post = new Post({
        title: title,
        // category: category,
        description: description,
        imageUrl: imageUrl
    });
    post.save()
        .then(result => {
            console.log('created post!');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};

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

// exports.getdetail = (req, res, next) => {
//     res.render('post/detail-page', {
//         pageTitle: 'detail-page',
//         path: '/detail-page'
//     });
// }

