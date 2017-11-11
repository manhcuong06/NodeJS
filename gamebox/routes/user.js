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
    if (req.method == 'POST') {
        var data_post = req.body;
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
            level_options: constant.getLevelOptions(),
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
        } else if (req.method == 'POST') {
            var data_post = req.body;
            data_post.updated_at = new Date().getTime();
            if (user.image && user.image != data_post.image) {
                // Nếu đã tồn tại image cũ và post image mới => xóa image cũ
                file.remove(IMAGE_PATH + user.image);
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
                level_options: constant.getLevelOptions(),
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

// Post image ajax
router.post('/upload-image', (req, res) => {
    var buffer = file.decodeBase64(req.body.image);
    var image = '';
    if (buffer) {
        image = 'user_' + buffer.name;
        file.upload(IMAGE_PATH + image, buffer.data);
    }
    res.send(image);
});

// catch 404 page not found
router.use((req, res) => {
    res.render('admin/404-not-found', { layout: false });
});

module.exports = router;
