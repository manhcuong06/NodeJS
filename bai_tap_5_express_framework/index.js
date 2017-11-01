const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const express = require('express');

const stream_module = require('./libraries/stream-module');

const app = express();
const users = JSON.parse(stream_module.readData('users'));

var current_user;
app.use(/^((?!\.).)*$/g, (req, res, next) => {
    current_user = null;
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
        users.map(user => {
            if (user.username == data_post.username && user.password == data_post.password) {
                user.logged_in = true;
                stream_module.writeData('users', users);
                current_user = user;
            }
        });
        if (current_user) {
            res.redirect('/');
        } else {
            stream_module.renderHTML(res, '/error', current_user, 'Wrong username or password.');
        }
    });
});
app.post('/dang-xuat', (req, res) => {
    var body = '';
    req.on('data', (data) => {
        body = data.toString();
    });
    req.on('end', () => {
        var data_post = querystring.parse(body);
        users.map(user => {
            if (user.id == data_post.user_id) {
                user.logged_in = false;
                stream_module.writeData('users', users);
                current_user = null;
                res.redirect('/');
            }
        });
    });
});

app.get('/*.*', (req, res) => {
    stream_module.renderAsset(res, '/' + req.url);
});

app.use((req, res) => {
    stream_module.renderHTML(res, '/error', current_user, '404 Page not found.');
});

const server = http.createServer(app);
server.listen(8000);