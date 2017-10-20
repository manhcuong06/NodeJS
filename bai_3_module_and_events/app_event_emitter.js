var http = require('http');

EventEmitter = require('events').EventEmitter;
var my_event = new EventEmitter();
my_event.on('server_loaded', () => {
    console.log('Server is loaded successfully.');
});

var server = http.createServer((request, response) => {
    my_event.emit('server_loaded');
    response.end('App Event Emitter');
});

server.listen(8000);