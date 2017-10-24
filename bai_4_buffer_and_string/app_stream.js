var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var server = http.createServer((req, res) => {
    var body;
    req.on('data', (data) => {
        body = data.toString();
    });
    req.on('end', () => {
        var data_post = querystring.parse(body);
        switch (req.url) {
            case '/':
                html = fs.readFileSync('./views/app_stream.html').toString();
                res.write(html);
                res.end();
                break;
            case '/':
                break;
            default:
                var file_name = data_post.file_name;
                if (!file_name) {
                    break;
                }
                var read_stream = fs.createReadStream(`./readFiles/${file_name}`);
                var result;

                read_stream.on('data', (data) => {
                    result = data.toString();
                });
                read_stream.on('end', () => {
                    var write_stream = fs.createWriteStream(`./writeFiles/${file_name}`);
                    var my_date = new Date();
                    write_stream.write(result + my_date.toString());
                    write_stream.end();
                    res.write('End');
                    res.end();
                });
                break;
        }
    });
});

server.listen(8000);