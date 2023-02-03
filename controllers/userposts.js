const products = [];

exports.getAddPost = (req, res, next) => {
    res.render('add-post', {
        pageTitle: 'Add Post',
        path: '/admin/add-post',
        // async: true
        // activeAddPost: true
    });
};

exports.postAddPost = (req, res, next) => {
    products.push({ title: req.body.title });
    products.push({ category: req.body.category });
    products.push({ description: req.body.description });
    products.push({ image: req.body.image });
    res.redirect('/');
};

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