var express = require('express');
var bcrypt = require('../libraries/bcrypt_module');
var constant = require('../libraries/constant_module');
var _status = require('../libraries/constant_status');
var router = express.Router();

// Models
var Product = require('../models/product');

router.get('/', (req, res) => {
    Product.find().then(products => {
        res.render('admin/product/', {
            page_title: 'List of Games',
            products: products,
            status_labels: _status.getStatusLabels(),
        });
    });
});

router.get('/view/:id', (req, res, next) => {
    var condition = { _id: Product.getObjectId(req.params.id) };
    Product.findOne(condition).then(product => {
        res.render('admin/product/view', {
            page_title: product.name,
            product: product,
            status_labels: _status.getStatusLabels(),
        });
    });
});

router.all('/add', (req, res, next) => {
    if (req.method == 'POST') {
        var data_post = req.body;
        Product.insert(data_post).then(result => {
            if (!result) {
                req.session.message = constant.getErrorMessage('The product is already in the data.');
                res.redirect('/admin/product');
            } else {
                // Post image
                res.redirect('/admin/product/view/' + result.insertedIds[0]);
            }
        });
    } else {
        res.render('admin/product/form', {
            page_title: 'Add New Product',
            status_options: _status.getStatusOptions(),
            product: {},
        });
    }
});

router.all('/update/:id', (req, res, next) => {
    var condition = { _id: Product.getObjectId(req.params.id) };
    Product.findOne(condition).then(product => {
        if (req.method == 'POST') {
            var data_post = req.body;
            console.log(data_post);
            Product.update(condition, data_post).then(result => {
                if (!result) {
                    req.session.message = _status.getErrorMessage('The product is already in the data.');
                } else {
                    // Post image
                    req.session.message = _status.getSuccessMessage(data_post.name + ' was updated successfully.');
                }
                res.redirect('/admin/product');
            });
        } else {
            console.log(_status.getStatusOptions());
            res.render('admin/product/form', {
                page_title: 'Update Product: ' + product.name,
                product: product,
                status_options: _status.getStatusOptions(),
            });
        }
    });
});

router.post('/delete', (req, res, next) => {
    // var condition = { _id: Product.getObjectId(req.body.id) };
    // Product.delete(condition).then(result => {
    //     if (!result) {
    //         req.session.message = constant.getErrorMessage('Delete user failed.');
    //     } else {
    //         req.session.message = constant.getSuccessMessage('Delete user successfully.');
    //     }
    //     res.redirect('/admin/product');
    // });
});

// catch 404 page not found
router.use((req, res) => {
    res.render('admin/404-not-found', { layout: false });
});

module.exports = router;