var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.redirect('/site');
});

router.get('/test-realtime', (req, res) => {
    res.render('test-realtime', { layout: false });
});

module.exports = router;
