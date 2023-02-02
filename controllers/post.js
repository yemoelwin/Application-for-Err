const Post = require('../models/post');

exports.getPost = (req, res, next) => {
  res.render('/', {
    pageTitle: 'Add Post',
    path: '/',
    editing: false
  });
};

exports.postErrPost = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const imageUrl = req.body.imageUrl;
  const post = new Post({
    title: title,
    description: description,
    category: category,
    imageUrl: imageUrl
  });
  post.save()
  .then(result => {
    console.log('Created Post');
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  })
};

// exports.getEditPost = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const errTitleId = req.params.errorTitleId;
//   Product.findById(errTitleId)
//     .then(post => {
//       if (!post) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit_post', {
//         pageTitle: 'Edit Question',
//         path: '/admin/edit_post',
//         editing: editMode,
//         post: post
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postEditPost = (req, res, next) => {
//   const errTitleId = req.body.errorTitleId;
//   const updatedTitle = req.body.title;
//   const updatedDesc = req.body.description;
//   const updatedCategory = req.body.category;
//   const updatedImageUrl = req.body.imageUrl;

//   const post = new Post(
//     updatedTitle,
//     updatedDesc,
//     updatedCategory,
//     updatedImageUrl,
//     errTitleId
//   );
//   post
//     .save()
//     .then(result => {
//       console.log('UPDATED POST!');
//       res.redirect('/');
//     })
//     .catch(err => console.log(err));
// };

// exports.getPosts = (req, res, next) => {
//   Post.fetchAll()
//     .then(posts => {
//       res.render('admin/posts', {
//         psts: posts,
//         pageTitle: 'Admin Posts',
//         path: '/'
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postDeletePost = (req, res, next) => {
//   const errorTitleId = req.body.errorTitleId;
//   Post.deleteById(errorTitleId)
//     .then(() => {
//       console.log('DESTROYED Post');
//       res.redirect('/');
//     })
//     .catch(err => console.log(err));
// };
