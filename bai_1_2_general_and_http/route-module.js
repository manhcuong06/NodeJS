var fs = require('fs');
var url = require('url');

function renderHTML(path, response) {
    fs.readFile(path, null, (error, data) => {
        if (error) {
            response.writeHead(404);
            response.write('File not found.');
        } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
        }
        response.end();
    });
}

module.exports = {
    handleRequest: function(request, response) {
        var path = url.parse(request.url).pathname;

        switch(path) {
            case '/':
                renderHTML('./index.html', response);
                break;
            default:
                response.writeHead(404);
                response.write('Invalid route.');
                response.end();
        }
    }
}