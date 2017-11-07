var express = require('express');
// var product = require('./product');
var user = require('./user');

var router = express.Router();

router.all('/login', (req, res) => {
    if (req.session.current_admin) {
        res.redirect('/admin');
    } else if (req.method == 'POST') {
        /***** Implement later *****/
        req.session.current_admin = { name: 'Admin' }
        res.redirect('/admin');
    } else {
        res.render('admin/login', { layout: false });
    }
});

router.use((req, res, next) => {
    if (req.session.current_admin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
});

router.get('/', (req, res) => {
    res.render('admin/', {
        page_title: 'Welcome',
    });
});

router.post('/logout', (req, res) => {
    req.session.current_admin = null;
    res.redirect('/admin');
});

// Routes
// router.use('/product', product);
router.use('/user', user);

// catch 404 page not found
router.use((req, res) => {
    res.render('admin/404-not-found', { layout: false });
});

module.exports = router;