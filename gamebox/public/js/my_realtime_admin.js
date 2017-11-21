$(() => {
    var socket = io.connect('http://localhost:3000');

    socket.on('update_bill', () => {
        var current_bill = Number($('#num_of_bill').html());
        $('#num_of_bill').html(current_bill + 1);
    });

    // $("#bt_product").click(() => {
    //     data_post = {
    //         category: category.value,
    //         name: name.value,
    //         image_input: image_input.value,
    //         image_name: image_name.value,
    //         price: price.value,
    //         quantity: quantity.value
    //     }
    //     socket.emit("Product-send-data", data_post);
    // });
});