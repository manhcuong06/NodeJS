var _socket = null;

module.exports = {
    init: (io) => {
        var current_coordinate = {
            x: 120,
            y: 150,
        };
        io.sockets.on('connection', socket => {
            _socket = socket;
            socket.on('start', () => {
                socket.emit('move', current_coordinate);
            });
            socket.on('dragging', (coordinate) => {
                current_coordinate = coordinate;
                io.sockets.emit('move', current_coordinate);
            });
            socket.on('disconnect', () => {});
        });
    },
    emit: (event, data = null) => {
        _socket.emit(event, data);
    },
    broadcastEmit: (event, data = null) => {
        _socket.broadcast.emit(event, data);
    },
}