var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var server = http.createServer((req, res) => {
    var body;
    req.on('data', (data) => {
        body = data.toString();
    });
    req.on('end', () => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        switch (req.url) {
            case '/':
            var html = fs.readFileSync('./views/bai_3_2.html').toString();
                break;
            default:
                break;
        }
    });
    res.end();
});
server.listen(8000);
