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

router.use((req, res, next) => {
    var view = req.url.replace('/', 'site/');
    res.render(view);
});

module.exports = router;
