var express = require('express');
var moment = require('moment');
var bcrypt = require('../libraries/bcrypt_module');
var constant = require('../libraries/constant_module');
var router = express.Router();

// Models
var User = require('../models/user');

router.get('/', (req, res) => {
    User.getArrayData('user', null, users => {
        res.render('user/', {
            page_title: 'List of User',
            level_labels: constant.getLevelLabels(),
            users: users,
        });
    });
});

router.get('/view/:id', (req, res, next) => {
    User.getDataById('user', req.params.id, (err, user) => {
        if (!user) {
            next(); // 404 Page Not Found
            return;
        }
        res.render('user/view', {
            page_title: user.name,
            user: user,
        });
    });
});

router.all('/add', (req, res, next) => {
    if (req.method == 'POST') {
        var data = req.body;
        User.insertData('user', data, (err, result) => {
            if (err) {
            } else {
                // Post image
            }
            res.redirect('/user');
        });
    } else {
        res.render('user/form', {
            page_title: 'Add New User',
            level_options: constant.getLevelOptions(),
            user: {},
        });
    }
});

router.all('/update/:id', (req, res, next) => {
    var id = req.params.id;
    User.getDataById('user', id, (err, user) => {
        if (!user) {
            next(); // 404 Page Not Found
            return;
        }
        if (req.method == 'POST') {
            var data = req.body;
            User.updateData('user', id, data, (err, result) => {
                if (err) {
                } else {
                    // Post image
                }
                res.redirect('/user');
            });
        } else {
            res.render('user/form', {
                page_title: 'Update User: ' + user.name,
                level_options: constant.getLevelOptions(),
                user: user,
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
            User.deleteData('user', id, (err, result) => {
                if (err) {
                } else {
                    // Delete image
                }
                res.redirect('/user');
            })
        }
    });
});

// catch 404 page not found
router.use((req, res) => {
    res.render('admin/404-not-found', { layout: false });
});

module.exports = router;