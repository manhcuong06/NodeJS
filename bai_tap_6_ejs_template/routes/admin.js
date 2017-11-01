var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin/index', { layout: '_templates/admin' });
});

module.exports = router;
