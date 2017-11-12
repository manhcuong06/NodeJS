$(() => {
    var socket = io.connect('http://localhost:3000');
    $('#checkout_form').on('submit', e => {
        socket.emit('payment');
    });
});