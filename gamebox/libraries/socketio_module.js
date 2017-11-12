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
    getSocket: () => {
        return _socket;
    },
}