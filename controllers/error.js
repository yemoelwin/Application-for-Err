exports.get404 = (req, res, next) => {
    res.status(404)
        .render('404', {
            pageTitle: 'Page Not Found',
            path: '/404',
        });
};

// exports.get401 = (req, res, next) => {
//     res.status(401)
//         .render('401', {
//             pageTitle: 'You are not able to access this page!',
//             path: '/401',
//             isAuthenticated: req.session.isloggedin
//         });
// };