var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({secret: 'secret'}));

router.get('/', (req, res, next) => {
    if (req.session.current_user) {
        next();
    } else {
        res.redirect('/admin/login');
    }
});

router.get('/login', (req, res, next) => {
    if (req.session.current_user) {
        res.redirect('/admin');
    } else {
        res.render('admin/login', { layout: false });
    }
});

router.post('/login', (req, res, next) => {
    req.session.current_user = true;
    res.redirect('/admin');
});

router.post('/logout', (req, res, next) => {
    req.session.current_user = false;
    res.redirect('/admin/login');
});

router.use((req, res, next) => {
    var view = req.url.replace('/', 'admin/');
    res.render(view);
});

module.exports = router;
