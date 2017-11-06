var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/', {
        page_title: 'Admin',
    });
});

router.post('/logout', (req, res) => {
    req.session.current_user = null;
    res.redirect('/');
});

module.exports = router;