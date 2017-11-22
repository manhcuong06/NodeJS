$(() => {
    var socket = io.connect('http://localhost:3000');
    socket.on('update_bill', (bill) => {
        // Update count (left navigation)
        $('#bill-count').html(Number($('#bill-count').html()) + 1);

        // Update table
        var current_table = $('#bill-table').html();
        var new_bill =
            `<tr>
                <td class="bill-index"></td>
                <td>${bill.name}</td>
                <td>${bill.phone}</td>
                <td>${bill.address}</td>
                <td><a href="mailto:${bill.email}">${bill.email}</a></td>
                <td>${bill.quantity}</td>
                <td>${bill.price}</td>
                <td>${new Date(Number(bill.created_at)).toLocaleString()}</td>
                <td></td>
                <td><a href="/admin/bill/view/${bill._id}" class="btn btn-info"><span class="fa fa-eye"></span></a></td>
            </tr>`;
        $('#bill-table').html(new_bill + current_table);

        // Update index
        var indexes = $('.bill-index');
        for (var i = 0; i < indexes.length; i++) {
            $(indexes[i]).html(Number($(indexes[i]).html()) + 1);
        }
    })
});