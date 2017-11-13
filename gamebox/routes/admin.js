var express = require('express');
var constant = require('../libraries/constant_module');
var bill = require('./bill');
var product = require('./product');
var user = require('./user');

var router = express.Router();

// Models
var Bill = require('../models/bill');
var User = require('../models/user');

router.all('/login', (req, res) => {
    if (req.session.current_admin) {
        res.redirect('/admin');
    } else if (req.method == 'POST') {
        var conditions = req.body;
        conditions.level = { $lt: '4' };
        User.findOne(conditions).then(user => {
            if (!user) {
                req.session.message = constant.getErrorMessage('Wrong email or password.');
                res.redirect('/admin/login');
            } else {
                User.update(user, { last_login: new Date().getTime() }).then(result => {
                    req.session.current_admin = {
                        _id: user._id,
                        level: user.level,
                        name: user.name
                    };
                    res.redirect('/admin');
                });
            }
        });
    } else {
        res.render('admin/login', { layout: false });
    }
});

router.use((req, res, next) => {
    if (req.session.current_admin) {
        var conditions = { paid_at: {$exists: false} };
        Bill.count(conditions).then(result => {
            res.locals.not_yet_paid = result;
            next();
        });
    } else {
        res.redirect('/admin/login');
    }
});

router.get('/', (req, res) => {
    res.render('admin/', {
        page_title: 'Welcome',
    });
});

router.post('/logout', (req, res) => {
    req.session.current_admin = null;
    res.redirect('/admin');
});

// Routes
router.use('/bill', bill);
router.use('/product', product);
router.use('/user', user);

// catch 404 page not found
router.use((req, res) => {
    res.render('admin/404-not-found', { layout: false });
});

module.exports = router;