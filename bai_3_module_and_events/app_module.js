var http = require('http');
var module_xu_ly_chuoi = require('./libraries/module_xu_ly_chuoi');

var server = http.createServer((request, response) => {
    var str = 'Xin chúc mừng bạn đã xây dựng module đầu tiên.';
    result = module_xu_ly_chuoi.camel_case(str);

    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write(`<h2>Before: ${str}</h2>`);
    response.write(`<h2>After: ${result}</h2>`);
    response.end('App Module');
});

server.listen(8000);