var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var routing = require('./libraries/routing-module');

var server = http.createServer((req, res) => {
    var body;
    req.on('data', (data) => {
        body = data.toString();
    });
    req.on('end', () => {
        routing.handleRequest(req, res);
    });
});

server.listen(8000);