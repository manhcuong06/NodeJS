var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer((request, response) => {
    var body;
    request.on('data', (data) => {
        body = data.toString();
    });
    request.on('end', () => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        var data_post = querystring.parse(body);
        var from = Number(data_post.from);
        var to = Number(data_post.to);
        var result = '';
        for (var i = from; i <= to; i++) {
            for (var j = 1; j <= 10; j++) {
                result += `${i} * ${j} = ${i * j}<br>`;
            }
            result += '<br>';
        }
        if (request.url == '/') {
            var html = fs.readFileSync('./bai_2_3.html').toString();
            response.write(html);
            response.write(result);
            response.end();
        } else {
            response.write(result);
            response.end();
        }
    });
});

server.listen(8000);