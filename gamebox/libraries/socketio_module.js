var Conversation = require('../models/conversation');
var Message = require('../models/message');

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
            socket.on('customer_reply', (data) => {
                var conversation = {
                    user_id: Conversation.getObjectId(data.user_id),
                };
                var message = {
                    content: data.content,
                    created_at: new Date().getTime(),
                    from_customer: true
                };

                Conversation.findOne(conversation).then(con => {
                    if (con) {
                        message.conversation_id = Message.getObjectId(con._id);
                        Message.insert(message);
                    } else {
                        Conversation.insert(conversation).then(result => {
                            message.conversation_id = Message.getObjectId(result.insertedIds[0]);
                            Message.insert(message);
                        });
                    }
                });
            });
            socket.on('admin_reply', (data) => {
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