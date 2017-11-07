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

// catch 404 page not found
router.use((req, res) => {
    res.render('admin/404-not-found', { layout: false });
});

module.exports = router;