var express = require('express');
var router = express.Router();

// Models
var Conversation = require('../models/conversation');

router.use((req, res, next) => {
    Conversation.find().then(con => {
        next();
    });
});

router.get('/', (req, res) => {
    res.render('admin/conversation/');
});

router.get('/view/:id', (req, res) => {
    res.render('admin/conversation/view');
});

module.exports = router;
