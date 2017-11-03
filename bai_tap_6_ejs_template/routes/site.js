var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    next();
});

router.get('/about', (req, res, next) => {
    next();
});

router.get('/detail', (req, res, next) => {
    next();
});

router.get('/gallery', (req, res, next) => {
    next();
});

router.get('/news', (req, res, next) => {
    next();
});

router.get('/reviews', (req, res, next) => {
    next();
});

router.post('/login', (req, res, next) => {
    if (req.body.username && req.body.password) {
        req.session.username = req.body.username
        res.redirect('/site');
    } else {
        res.send('Wrong username or password');
    }
});

router.get('/logout', (req, res) => {
    req.session.reset();
    res.redirect('/site');
});

router.use((req, res, next) => {
    var view = req.url.replace('/', 'site/');
    res.render(view);
});

module.exports = router;
