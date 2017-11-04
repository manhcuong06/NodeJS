var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    if (req.session.current_user) {
        renderHTML(req, res);
    } else {
        res.redirect('/site');
    }
});

router.post('/logout', (req, res) => {
    req.session.reset();
    res.redirect('/site');
});

module.exports = router;

function renderHTML(req, res) {
    var view = req.url.replace('/', 'admin/');
    res.render(view, { data: req.data });
}