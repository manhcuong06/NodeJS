var http = require('http');
var routing_module = require('./libraries/routing-module');

var server = http.createServer((req, res) => {
    var body;
    req.on('data', (data) => {
        body = data.toString();
    });
    req.on('end', () => {
        routing_module.handleRequest(req, res);
    });
});

server.listen(8000);