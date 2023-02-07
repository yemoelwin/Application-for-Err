const Post = require('../models/post');

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