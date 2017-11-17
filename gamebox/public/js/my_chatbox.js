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
    var message = $('.chat-form textarea').val();
    if (!message) {
        return;
    }
    socket.emit('message_sent', message);

    var chatlogs = $('.chatlogs').html();
    chatlogs = chatlogs +
        `<div class="chat self">
            <div class="user-photo"><img src="/images/no-user.png"></div>
            <p class="chat-message">${message}</p>
        </div>`
    ;
    $('.chatlogs').html(chatlogs);
    $('.chatlogs').scrollTop($('.chatlogs').prop('scrollHeight'));
    $('.chat-form textarea').val('');
}