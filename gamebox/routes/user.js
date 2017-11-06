var express = require('express');
var bcrypt = require('../libraries/bcrypt_module');
var contant = require('../libraries/constant_module');
var router = express.Router();

// Models
var User = require('../models/user');

router.get('/', (req, res) => {
    User.getArrayData('user', null, users => {
        res.render('user/', {
            page_title: 'List of User',
            users: users,
            level_labels: contant.getLevelLabels(),
        });
    });
});

router.get('/view/:id', (req, res, next) => {
    User.getDataById('user', req.params.id, (err, user) => {
        if (err) {
            next(); // 404 Page Not Found
        } else {
            res.render('user/view', {
                page_title: user.name,
                user: user
            });
        }
    });
});

router.get('/view/:id', (req, res, next) => {
    User.getDataById('user', req.params.id, (err, user) => {
        if (err) {
            next(); // 404 Page Not Found
        } else {
            res.render('user/view', {
                page_title: user.name,
                user: user
            });
        }
    });
});

router.all('/add', (req, res, next) => {
    res.render('user/add', {
        page_title: 'Add New User',
    });
});

router.all('/update/:id', (req, res, next) => {
    User.getDataById('user', req.params.id, (err, user) => {
        if (err) {
            next(); // 404 Page Not Found
        } else {
            res.render('user/update', {
                page_title: 'Update User: ' + user.name,
                user: user
            });
        }
    });
});

router.post('/delete', (req, res, next) => {
    var id = req.body.id;
    User.getDataById('user', id, (err, user) => {
        if (err) {
            next(); // 404 Page Not Found
        } else {
            User.deleteData('user', id, () => {
                res.redirect('/user');
            })
        }
    });
});

module.exports = router;