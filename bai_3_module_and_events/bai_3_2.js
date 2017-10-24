var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
MyDate = require('./libraries/module_xu_ly_ngay_thang');

var server = http.createServer((req, res) => {
    var body;
    req.on('data', (data) => {
        body = data.toString();
    });
    req.on('end', () => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var data_post = querystring.parse(body);
        var input_date = data_post.input_date ? new Date(data_post.input_date) : new Date();
        var language = data_post.language;
        var format = data_post.format;
        switch (req.url) {
            case '/':
                var html = fs.readFileSync('./views/bai_3_2.html').toString();
                res.write(html);
                break;
            default:
                var my_date = new MyDate(input_date);
                res.write(my_date.formatDate(language, format));
                break;
        }
        res.end();
    });
});
server.listen(8000);
