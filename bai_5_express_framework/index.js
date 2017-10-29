const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const uuidv1 = require('uuid/v1');
const fileType = require('file-type');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    var html = fs.readFileSync('./index.html').toString();
    res.send(html);
});
app.get('/*.*', (req, res) => {
    var file = fs.readFileSync('.' + req.url).toString();
    res.send(file);
});
app.post('/', (req, res) => {
    var data_post = '';
    req.on('data', (chunk) => { data_post += chunk });
    req.on('end', () => {
        data_post = querystring.parse(data_post);
        var imageBuffer = decodeBase64Image(data_post.hinh);
        var ten_file = tao_ten_file(imageBuffer.type);
        fs.writeFileSync('images/' + ten_file, imageBuffer.data);
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send('thành công');
    })
});

const server = http.createServer(app);
server.listen(8000);

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

function tao_ten_file(loai_file){
    var ten_file = uuidv1();
    if(loai_file == 'image/jpeg'){
        ten_file += '.jpg';
    }
    else if(loai_file == 'image/png'){
        ten_file += '.png';
    }
    else if(loai_file == 'image/gif'){
        ten_file += '.gif';
    }

    return ten_file;
}