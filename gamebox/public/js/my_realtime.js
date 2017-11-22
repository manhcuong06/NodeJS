var socket = null;
$(() => {
    socket = io.connect('http://localhost:3000');
    socket.on('append_mes_to_site', (mes) => {
        var conversation_id = $('#conversation_id').val();
        if (mes.conversation_id != conversation_id) {
            return;
        }
        var mes_html =
            `<div class="chat reply">
                <div class="user-photo"><img src="/images/no-admin.png"></div>
                <p class="chat-message">${mes.content}</p>
            </div>`
        ;
        $(mes_html).appendTo($('.chatlogs'));
        $('.chatlogs').animate({ scrollTop: $('.chatlogs').prop('scrollHeight') }, 'fast');
    });
});