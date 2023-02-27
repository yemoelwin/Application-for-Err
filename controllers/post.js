const Post = require('../models/post');
const Items_Per_Page = 1;

exports.getPosts = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalItems;

    Post.find()
        .countDocuments()
        .then(postnumber => {
            totalItems = postnumber;
            return Post.find()
                .skip((page - 1) * Items_Per_Page)
                .limit(Items_Per_Page);
        })
        .then(posts => {
            res.render('post/post-list', {
                prods: posts,
                pageTitle: 'All Posts',
                path: '/',
                currentPage: page,
                hasNextPage: Items_Per_Page * page < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / Items_Per_Page)
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getPost = (req, res, next) => {
    const prodId = req.params.postId;
    // console.log(prodId);
    // res.redirect('/');
    Post.findById(prodId, (post) => {
        res.render("post/detail-page", {
            post: post,
            pageTitle: post.title,
            path: "/profile",
        });
    });
    // .then(post => {
    //     res.render('post/detail-page', {
    //         post: post,
    //         pageTitle: post.title,
    //         path: '/profile'
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    // });
};

exports.getPostDetail = (res, req, next) => {
    const prodId = req.params.postId;
    Post.findById(prodId)
        .then((post) => {
            res.render("post/detail-page", {
                post: post,
                pageTitle: post.title,
                path: "/detail-page",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getPostDetail = (res, req, next) => {
    const prodId = req.params.postId;
    Post.findById(prodId)
        .then((post) => {
            res.render("post/detail-page", {
                post: post,
                pageTitle: post.title,
                path: "/detail-page",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
