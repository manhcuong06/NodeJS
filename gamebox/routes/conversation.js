var express = require('express');
var router = express.Router();

// Models
var Conversation = require('../models/conversation');

router.use((req, res, next) => {
    Conversation.find().then(conversations => {
        res.locals.conversations = conversations;
        next();
    });
});

router.get('/', (req, res) => {
    res.render('admin/conversation/');
});

router.get('/view/:id', (req, res) => {
    var condition = {_id: Conversation.getObjectId(req.params.id)};
    Conversation.findOne(condition).then(con => {
        res.json(con);
    });
});

module.exports = router;
