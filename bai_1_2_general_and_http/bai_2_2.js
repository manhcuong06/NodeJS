var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer((request, response) => {
    var url_parse = url.parse(request.url).query;
    var query = querystring.parse(url_parse);
    var num_1 = query.num_1;
    var num_2 = query.num_2;

    response.write(`${num_1} + ${num_2} = ${num_1*1 + num_2*1}`);
    response.end();
});

server.listen(8000);