const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const express = require('express');

const stream_module = require('./libraries/stream-module');

const app = express();
const users = JSON.parse(stream_module.readData('users'));

var current_user = null;
app.use(/^((?!\.).)*$/g, (req, res, next) => {
    users.forEach(user => {
        if (user.logged_in) {
            current_user = user;
        }
    });
    next();
});

app.get('/', (req, res) => {
    stream_module.renderHTML(res, '/home', current_user);
});
app.get('/video', (req, res) => {
    stream_module.renderHTML(res, req.url, current_user);
});
app.get('/tin-tuc', (req, res) => {
    stream_module.renderHTML(res, req.url, current_user);
});
app.get('/dang-ky', (req, res) => {
    stream_module.renderHTML(res, req.url, current_user);
});

app.post('/dang-nhap', (req, res) => {
    var body = '';
    req.on('data', (data) => {
        body = data.toString();
    });
    req.on('end', () => {
        var data_post = querystring.parse(body);
        var success = false;
        users.map(user => {
            if (user.username == data_post.username && user.password == data_post.password) {
                user.logged_in = true;
                current_user = user;
                success = true;
            }
        });
        stream_module.writeData('users', users);
        res.send(JSON.stringify({success: success}));
    });
});
app.post('/dang-xuat', (req, res) => {
    var body = '';
    req.on('data', (data) => {
        body = data.toString();
    });
    req.on('end', () => {
        var id_post = body;
        users.map(user => {
            if (user.id == id_post) {
                user.logged_in = false;
                current_user = null;
            }
        });
        stream_module.writeData('users', users);
        res.send(JSON.stringify({success: true}));
    });
});

app.get('/*.*', (req, res) => {
    stream_module.renderAsset(res, '/' + req.url);
});

app.use((req, res) => {
    res.send('404 NOT FOUND');
})

const server = http.createServer(app);
server.listen(8000);