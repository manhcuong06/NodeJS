var http = require('http');
var fs = require('fs');
var zlib = require('zlib');
var querystring = require('querystring');

const COPY = 0;
const ZIP = 1;

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
            case '/get-files':
                var source_files = fs.readdir('./sourceFiles', (error, files) => {
                    res.write(JSON.stringify(files));
                    res.end();
                });
                break;
            case '/create-file':
                var file_name = data_post.file_name;
                var action = Number(data_post.action);
                if (req.method != 'POST' || !file_name) {
                    res.write('Error');
                    res.end();
                }
                var read_stream = fs.createReadStream(`./sourceFiles/${file_name}`);
                var result;

                read_stream.on('data', (data) => {
                    result = data.toString();
                });
                read_stream.on('end', () => {
                    switch (action) {
                        case COPY:
                            var write_stream = fs.createWriteStream(`./targetFiles/${file_name}`);
                            write_stream.write(result);
                            write_stream.end();
                            res.write(`Copy ${file_name} successfully`);
                            break;
                        case ZIP:
                            fs.createReadStream(`./sourceFiles/${file_name}`)
                                .pipe(zlib.createGzip())
                                .pipe(fs.createWriteStream(`./targetFiles/_${file_name}.zip`))
                            ;
                            res.write(`Zip ${file_name} successfully`);
                            break;
                        default:
                            break;
                    }
                    res.end();
                });
                break;
            default:
                res.end();
                break;
        }
    });
});

server.listen(8000);