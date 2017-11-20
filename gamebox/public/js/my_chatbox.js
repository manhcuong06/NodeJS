$('.chatbox .head').on('click', () => {
    $('.chatbox').toggleClass('minimize');
});
$('.chat-form textarea').on('keypress', (e) => {
    if (e.keyCode == 13) {
        e.preventDefault();
        send();
    }
});
$('.chat-form button').on('click', () => {
    send();
});

function send() {
    var content = $('.chat-form textarea').val();
    if (!content) {
        return;
    }
    var message = {
        user_id: current_user_id.value,
        content: content
    }
    socket.emit('customer_reply', message);

    var chatlogs = $('.chatlogs').html();
    chatlogs = chatlogs +
        `<div class="chat self">
            <div class="user-photo"><img src="/images/no-user.png"></div>
            <p class="chat-message">${content}</p>
        </div>`
    ;
    $('.chatlogs').html(chatlogs);
    $('.chatlogs').scrollTop($('.chatlogs').prop('scrollHeight'));
    $('.chat-form textarea').val('');
}