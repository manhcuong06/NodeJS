var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/about', function(req, res, next) {
    res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/detail', function(req, res, next) {
  res.render('detail');
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery');
});

router.get('/news', function(req, res, next) {
  res.render('news');
});

router.get('/reviews', function(req, res, next) {
    res.render('reviews');
});

module.exports = router;
