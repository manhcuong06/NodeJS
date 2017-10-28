var http = require('http');
var routing_module = require('./libraries/routing-module');
var qs = require('querystring');

var server = http.createServer((req, res) => {
    var body;
    req.on('data', (data) => {
        body = data.toString();
    });
    req.on('end', () => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if(req.method == "GET") {
            routing_module.handleGetRequest(req, res);
        }
        else if(req.method == "POST") {
            var data_post = qs.parse(body);
            routing_module.handlePostRequest(req, res, data_post);
        }
    });
});

server.listen(8000);