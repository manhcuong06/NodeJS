var express = require('express');
var constant = require('../libraries/constant_module');
var router = express.Router();

// Models
var Bill = require('../models/bill');

router.get('/', (req, res) => {
    var sort = { paid_at: 1, _id: -1 };
    Bill.find({}, sort).then(bills => {
        res.render('admin/bill', {
            page_title: 'List of bill',
            bills: bills,
        });
    });
});

router.get('/view/:id', (req, res) => {
    var condition = { _id: Bill.getObjectId(req.params.id) };
    Bill.findOne(condition).then(bill => {
        if (!bill) {
            req.session.message = constant.getErrorMessage();
            res.redirect('/admin/bill');
        } else {
            res.render('admin/bill/view', {
                page_title: 'View title',
                bill: bill,
            });
        }
    });
});

router.get('/update-payment/:id', (req, res) => {
    var condition = { _id: Bill.getObjectId(req.params.id) };
    Bill.findOne(condition).then(bill => {
        if (!bill) {
            req.session.message = constant.getErrorMessage();
            res.redirect('/admin/bill');
        } else {
            paid_at = null;
            if (!bill.paid_at) {
                paid_at = new Date().getTime();
            }
            Bill.update(condition, {paid_at: paid_at}).then(result => {
                res.redirect('/admin/bill/view/' + req.params.id);
            });
        }
    });
});

module.exports = router;
