var express = require('express');
var bcrypt = require('../libraries/bcrypt_module');
var constant = require('../libraries/constant_module');
var file = require('../libraries/file_module');
var router = express.Router();

const IMAGE_PATH = './public/images/user/';

// Models
var User = require('../models/user');

router.get('/', (req, res) => {
    User.find().then(users => {
        res.render('admin/user/', {
            page_title: 'List of User',
            level_labels: constant.getLevelLabels(),
            users: users,
        });
    });
});

router.get('/view/:id', (req, res, next) => {
    var condition = { _id: User.getObjectId(req.params.id) };
    User.findOne(condition).then(user => {
        if (!user) {
            req.session.message = constant.getErrorMessage();
            res.redirect('/admin/user');
        } else {
            res.render('admin/user/view', {
                page_title: user.name,
                level_labels: constant.getLevelLabels(),
                user: user,
            });
        }
    });
});

router.all('/add', (req, res, next) => {
    if (req.session.current_admin.level > 2) {
        req.session.message = constant.getErrorMessage('Permission denied.');
        res.redirect('/admin/user');
    } else if (req.method == 'POST') {
        var data_post = req.body;
        if (data_post.image) {
            var buffer = file.decodeBase64(data_post.image);
            if (buffer) {
                data_post.image = 'user_' + buffer.name;
                file.upload(IMAGE_PATH + data_post.image, buffer.data);
            } else {
                delete data_post.image;
            }
        }
        User.insert(data_post).then(result => {
            if (!result) {
                req.session.message = constant.getErrorMessage('This email has already been taken.');
                res.redirect('/admin/user');
            } else {
                res.redirect('/admin/user/view/' + result.insertedIds[0]);
            }
        });
    } else {
        res.render('admin/user/form', {
            page_title: 'Add New User',
            level_options: constant.getLevelOptions(req.session.current_admin.level),
            user: {},
        });
    }
});

router.all('/update/:id', (req, res, next) => {
    var condition = { _id: User.getObjectId(req.params.id) };
    User.findOne(condition).then(user => {
        if (!user) {
            req.session.message = constant.getErrorMessage();
            res.redirect('/admin/user');
        } else if (req.session.current_admin.level > user.level) {
            req.session.message = constant.getErrorMessage('Permission denied.');
            res.redirect('/admin/user');
        } else if (req.method == 'POST') {
            var data_post = req.body;
            data_post.updated_at = new Date().getTime();
            if (user.image != data_post.image) {
                var buffer = file.decodeBase64(data_post.image);
                if (buffer) {
                    data_post.image = 'user_' + buffer.name;
                    file.upload(IMAGE_PATH + data_post.image, buffer.data);
                    file.remove(IMAGE_PATH + user.image);
                } else {
                    delete data_post.image;
                }
            }
            User.update(condition, data_post).then(result => {
                if (!result) {
                    req.session.message = constant.getErrorMessage('This email has already been taken.');
                } else {
                    req.session.message = constant.getSuccessMessage(data_post.name + ' was updated successfully.');
                }
                res.redirect('/admin/user');
            });
        } else {
            res.render('admin/user/form', {
                page_title: 'Update User: ' + user.name,
                level_options: constant.getLevelOptions(req.session.current_admin.level),
                user: user,
            });
        }
    });
});

router.post('/delete', (req, res, next) => {
    var condition = { _id: User.getObjectId(req.body.id) };
    User.findOne(condition).then(user => {
        if (user) {
            file.remove(IMAGE_PATH + user.image);
        }
    });
    User.delete(condition).then(result => {
        if (!result) {
            req.session.message = constant.getErrorMessage('Delete user failed.');
        } else {
            req.session.message = constant.getSuccessMessage('Delete user successfully.');
        }
        res.redirect('/admin/user');
    });
});

module.exports = router;
