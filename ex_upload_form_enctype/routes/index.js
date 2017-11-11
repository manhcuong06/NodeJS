var express = require('express');
var multer  = require('multer');
var router = express.Router();

var storage = multer.diskStorage({
    destination: 'public/',
    filename: (req, file, cb) => {
        cb(null, file.originalname.replace('.', '_' + Date.now() + '.'));
    }
});
var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('Successfully');
});

module.exports = router;
