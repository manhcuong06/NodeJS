var http = require('http');

var server = http.createServer((req, res) => {
    var buf_before = Buffer(26);
    for (var i=0; i<buf_before.length; i++) {
        buf_before[i] = i + 97;
    }

    var buf_after = Buffer(26);
    for (var i=0; i<buf_after.length; i++) {
        buf_after[i] = buf_before[i] - 32;
    }

    console.log(buf_before.toString());
    console.log(buf_after.toString());
    res.end('Buffer');
});

server.listen(8000);