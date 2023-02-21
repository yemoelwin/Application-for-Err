const Post = require('../models/post');
const path = require('path');

exports.getAddPost = (req, res, next) => {
    if (!req.session.isloggedin) {
        return res.redirect('/login');
    }
    res.render('user/edit-post', {
        pageTitle: 'Add Post',
        path: '/user/add-post',
        editing: false,
    });
};

exports.postAddPost = (req, res, next) => {
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const post = new Post({
        title: title,
        category: category,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
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

// exports.getEditPost = (req, res, next) => {
//     res.render('user/edit-post', {
//         pageTitle: 'Add Post',
//         path: '/user/add-post',
//         editing: false
//     });
// };


exports.getEditPost = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.postId;
    Post.findById(prodId)
        .then(post => {
            if (!post) {
                return res.redirect('/');
            }
            res.render('user/edit-post', {
                pageTitle: 'Edit Post',
                path: '/user/edit-post',
                editing: editMode,
                post: post,
            });

        })
        .catch(err => console.log(err));
};


exports.postEditPost = (req, res, next) => {
    const prodId = req.body.postId;
    const updatedTitle = req.body.title;
    const updatedCategory = req.body.category;
    const updatedDesc = req.body.description;
    const updatedImageUrl = req.body.imageUrl;

    Post.findById(prodId)
        .then(post => {
            if (post.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/');
            }
            post.title = updatedTitle;
            post.category = updatedCategory;
            post.description = updatedDesc;
            post.imageUrl = updatedImageUrl;
            return post.save()
                .then(result => {
                    console.log('Updated Post!');
                    res.redirect('/user/profile');
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProfilePosts = (req, res, next) => {
    Post.find({ userId: req.user._id })
        .then(posts => {
            res.render('user/profile', {
                prods: posts,
                pageTitle: 'Your Posts',
                path: '/profile',
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeletePost = (req, res, next) => {
    const prodId = req.body.postId;
    Post.deleteOne({ _id: prodId, userId: req.user._id })
        .then(() => {
            console.log('Destroyed Post!');
            res.redirect('/user/profile');
        })
        .catch(err => {
            console.log(err);
        });
};



// exports.getPosts = (req, res, next) => {
//     Post.findById()
//         .then(posts => {
//             res.render('user/profile', {
//                 prods: posts,
//                 pageTitle: 'Your Posts',
//                 path: '/user/profile'
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };



         // Post.findById(prodId, post => {
    //     if (!post) {
    //         return res.redirect('/');
    //     }
    //     res.render('user/edit-post', {
    //         pageTitle: 'Edit Post',
    //         path: '/user/edit-post',
    //         editing: editMode,
    //         post: post
    //     });
    // });