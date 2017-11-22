var socket = null;
var current_conversation_id = null;
var current_user_image = null;

$(() => {
    socket = io.connect('http://localhost:3000');
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
            </tr>`
        ;
        $('#bill-table').html(new_bill + current_table);

        // Update index
        var indexes = $('.bill-index');
        for (var i=0; i<indexes.length; i++) {
            $(indexes[i]).html(Number($(indexes[i]).html()) + 1);
        }
    });
    socket.on('append_mes_to_admin', (mes) => {
        var contacts = $('li.contact');
        for (var i=0; i<contacts.length; i++) {
            var contact = $(contacts[i]);
            if (contact.find('input').val() == mes.conversation_id) {
                contact.find('.preview.message').html(`<b class="new-message">${mes.content}</b>`);
                contact.find('.preview.time span').html(new Date(mes.created_at).toLocaleString());
                break;
            }
        }
        if (mes.conversation_id != current_conversation_id) {
            return;
        }
        var mes_html =
            `<li class="sent">
                <img src="/images/user/${current_user_image}" />
                <p>${mes.content}</p>
            </li>`
        ;
        $(mes_html).appendTo($('.messages ul'));
        $('.messages').animate({ scrollTop: $('.messages').prop('scrollHeight') }, 'fast');
    });
});