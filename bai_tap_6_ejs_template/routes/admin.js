var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    if (req.session.current_user) {
        next();
    } else {
        res.redirect('/site');
    }
});

/*
router.get('/login', (req, res) => {
    if (req.session.current_user) {
        res.redirect('/admin');
    } else {
        res.render('admin/login', { layout: false });
    }
});
router.post('/login', (req, res) => {
    req.session.current_user = true;
    res.redirect('/admin');
});
*/

router.post('/logout', (req, res) => {
    req.session.reset();
    res.redirect('/site');
});

router.use((req, res) => {
    var view = req.url.replace('/', 'admin/');
    res.render(view);
});

module.exports = router;
