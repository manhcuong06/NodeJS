var express = require('express');
var moment = require('moment');
var bcrypt = require('../libraries/bcrypt_module');
var constant = require('../libraries/constant_module');
var router = express.Router();

// Models
var User = require('../models/user');

router.get('/', (req, res) => {
    var message = req.session.message;
    req.session.message = null;
    User.getArrayData('user').then(users => {
        res.render('admin/user/', {
            page_title: 'List of User',
            message: message,
            level_labels: constant.getLevelLabels(),
            users: users,
        });
    });
});

router.get('/view/:id', (req, res, next) => {
    var condition = { _id: User.makeId(req.params.id) };
    User.getSingleData('user', condition).then(user => {
        if (!user) {
            req.session.message = constant.getErrorMessage();
            res.redirect('/admin/user');
        } else {
            res.render('admin/user/view', {
                page_title: user.name,
                user: user,
            });
        }
    });
});

router.all('/add', (req, res, next) => {
    if (req.method == 'POST') {
        var data = req.body;
        User.insertData('user', data).then(inserted_id => {
            if (!inserted_id) {
                req.session.message = constant.getErrorMessage('Insert user failed.');
                res.redirect('/admin/user');
            } else {
                // Post image
                res.redirect('/admin/user/view/' + inserted_id);
            }
        });
    } else {
        res.render('admin/user/form', {
            page_title: 'Add New User',
            level_options: constant.getLevelOptions(),
            user: {},
        });
    }
});

router.all('/update/:id', (req, res, next) => {
    var condition = { _id: User.makeId(req.params.id) };
    User.getSingleData('user', condition).then(user => {
        if (!user) {
            req.session.message = constant.getErrorMessage();
            res.redirect('/admin/user');
        } else if (req.method == 'POST') {
            var data = req.body;
            User.updateData('user', condition, data).then(result => {
                if (!result) {
                    req.session.message = constant.getErrorMessage('Update user failed.');
                } else {
                    // Post image
                    req.session.message = constant.getSuccessMessage(data.name + ' was updated successfully.');
                }
                res.redirect('/admin/user');
            });
        } else {
            res.render('admin/user/form', {
                page_title: 'Update User: ' + user.name,
                level_options: constant.getLevelOptions(),
                user: user,
            });
        }
    });
});

router.post('/delete', (req, res, next) => {
    var condition = { _id: User.makeId(req.body.id) };
    User.deleteData('user', condition).then(result => {
        if (!result) {
            req.session.message = constant.getErrorMessage('Delete user failed.');
        } else {
            req.session.message = constant.getSuccessMessage('Delete user successfully.');
        }
        res.redirect('/admin/user');
    });
});

// catch 404 page not found
router.use((req, res) => {
    res.render('admin/404-not-found', { layout: false });
});

module.exports = router;
