var express = require('express');
var bcrypt = require('../libraries/bcrypt_module');
var constant = require('../libraries/constant_module');
var socketio_module = require('../libraries/socketio_module');
var file = require('../libraries/file_module');
var router = express.Router();

const IMAGE_PATH = './public/images/product/';

// Models
var Product = require('../models/product');

router.get('/', (req, res) => {
    Product.find().then(products => {
        res.render('admin/product/', {
            page_title: 'List of Games',
            products: products,
        });
    });
});

router.get('/view/:id', (req, res, next) => {
    var condition = { _id: Product.getObjectId(req.params.id) };
    Product.findOne(condition).then(product => {
        if (!product) {
            req.session.message = constant.getErrorMessage();
            res.redirect('/admin/product');
        } else {
            res.render('admin/product/view', {
                page_title: product.name,
                product: product,
            });
        }
    });
});

router.all('/add', (req, res, next) => {
    if (req.method == 'POST') {
        var data_post = req.body;
        data_post.price = Number(data_post.price);
        data_post.quantity = Number(data_post.quantity);
        if (data_post.image) {
            var buffer = file.decodeBase64(data_post.image);
            if (buffer) {
                data_post.image = 'product_' + buffer.name;
                file.upload(IMAGE_PATH + data_post.image, buffer.data);
            } else {
                delete data_post.image;
            }
        }
        Product.insert(data_post).then(result => {
            if (!result) {
                req.session.message = constant.getErrorMessage('The product is already in the data.');
                res.redirect('/admin/product');
            } else {
                socketio_module.broadcastEmit('reload_top_games', data_post);
                res.redirect('/admin/product/view/' + result.insertedIds[0]);
            }
        });
    } else {
        res.render('admin/product/form', {
            page_title: 'Add New Product',
            product: {},
        });
    }
});

router.all('/update/:id', (req, res, next) => {
    var condition = { _id: Product.getObjectId(req.params.id) };
    Product.findOne(condition).then(product => {
        if (!product) {
            req.session.message = constant.getErrorMessage();
            res.redirect('/admin/product');
        } else if (req.method == 'POST') {
            var data_post = req.body;
            data_post.price = Number(data_post.price);
            data_post.quantity = Number(data_post.quantity);
            data_post.updated_at = new Date().getTime();
            if (product.image != data_post.image) {
                var buffer = file.decodeBase64(data_post.image);
                if (buffer) {
                    data_post.image = 'product_' + buffer.name;
                    file.upload(IMAGE_PATH + data_post.image, buffer.data);
                    file.remove(IMAGE_PATH + product.image);
                } else {
                    delete data_post.image;
                }
            }
            Product.update(condition, data_post).then(result => {
                if (!result) {
                    req.session.message = constant.getErrorMessage('The product is already in the data.');
                } else {
                    socketio_module.broadcastEmit('update_for_top_games', { condition: condition, data_post: data_post });
                    req.session.message = constant.getSuccessMessage(data_post.name + ' was updated successfully.');
                }
                res.redirect('/admin/product');
            });
        } else {
            res.render('admin/product/form', {
                page_title: 'Update Product: ' + product.name,
                product: product,
            });
        }
    });
});

router.post('/delete', (req, res, next) => {
    var condition = { _id: Product.getObjectId(req.body.id) };
    Product.findOne(condition).then(product => {
        if (product) {
            file.remove(IMAGE_PATH + product.image);
        }
    });
    Product.delete(condition).then(result => {
        if (!result) {
            req.session.message = constant.getErrorMessage('Delete product failed.');
        } else {
            Product.find({}, { _id: -1 }, 0, 6).then(top_games => {
                socketio_module.broadcastEmit('delete_for_top_games', top_games);
            });
            req.session.message = constant.getSuccessMessage('Delete product successfully.');
        }
        res.redirect('/admin/product');
    });
});

module.exports = router;