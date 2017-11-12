var express = require('express');
var constant = require('../libraries/constant_module');
var router = express.Router();

// Models
var Bill = require('../models/bill');
var BillDetail = require('../models/bill_detail');

router.get('/', (req, res) => {
    var sort = { paid_at: 1, _id: -1 };
    Bill.find({}, sort).then(bills => {
        res.render('admin/bill', {
            page_title: 'List of bill',
            bills: bills,
        });
    });
});

router.get('/view/:id', (req, res, next) => {
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

module.exports = router;
