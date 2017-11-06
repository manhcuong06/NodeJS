var bcrypt = require('../libraries/bcrypt_module');
var express = require('express');
var router = express.Router();

// Models
var User = require('../models/user');

router.get('/', (req, res) => {
    User.getArrayData('user', users => {
        res.render('user/', { users: users });
    });
});

router.get('/view/:id', (req, res, next) => {
    User.getDataById('user', req.params.id, (err, user) => {
        if (err) {
            next(); // 404 Page Not Found
        } else {
            res.render('user/view', { user: user });
        }
    });
});

module.exports = router;