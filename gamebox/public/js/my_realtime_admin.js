$(() => {
    var socket = io.connect('http://localhost:3000');
    socket.on('update_bill', () => {
        var current_bill = Number($('#num_of_bill').html());
        $('#num_of_bill').html(current_bill + 1);
    })
});