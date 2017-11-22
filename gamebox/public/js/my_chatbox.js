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
        content: content,
        conversation_id: conversation_id.value,
        user_id: current_user_id.value,
    };
    socket.emit('customer_reply', message);

    var mes_html =
        `<div class="chat self">
            <div class="user-photo"><img src="/images/no-user.png"></div>
            <p class="chat-message">${content}</p>
        </div>`
    ;
    $(mes_html).appendTo($('.chatlogs'));
    $('.chatlogs').animate({ scrollTop: $('.chatlogs').prop('scrollHeight') }, 'fast');
    $('.chat-form textarea').val(null);
}