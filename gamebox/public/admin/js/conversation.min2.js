// My Custom
var current_conversation_id = null;
var admin_image = $('img#profile-img').attr('src').replace('/images/user/', '');
// END My Custom

$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function() {
    $("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
    $("#profile").toggleClass("expanded");
    $("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function() {
    $("#profile-img").removeClass();
    $("#status-online").removeClass("active");
    $("#status-away").removeClass("active");
    $("#status-busy").removeClass("active");
    $("#status-offline").removeClass("active");
    $(this).addClass("active");
    if($("#status-online").hasClass("active")) {
        $("#profile-img").addClass("online");
    } else if ($("#status-away").hasClass("active")) {
        $("#profile-img").addClass("away");
    } else if ($("#status-busy").hasClass("active")) {
        $("#profile-img").addClass("busy");
    } else if ($("#status-offline").hasClass("active")) {
        $("#profile-img").addClass("offline");
    } else {
        $("#profile-img").removeClass();
    };
    $("#status-options").removeClass("active");
});

function newMessage() {
    if (!current_conversation_id) {
        return;
    }
    content = $(".message-input input").val();
    if($.trim(content) == '') {
        return false;
    }
    $('<li class="replies"><img src="/images/user/' + admin_image + '" /><p>' + content + '</p></li>').appendTo($('.messages ul'));
    $('.message-input input').val(null);
    $('.contact.active .preview.message').html('<span>You: </span>' + content);
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");

    var message = {
        conversation_id: current_conversation_id,
        content: content
    };
    socket.emit('admin_reply', message);
};

$('.submit').click(function() {
    newMessage();
});

$(window).on('keydown', function(e) {
    if (e.which == 13) {
        newMessage();
        return false;
    }
});

// My Custom
$('#bottom-bar #back').on('click', () => {
    window.location.href = '/admin';
});
$('li.contact').on('click', (e) => {
    // Remove other active
    removeActive();

    // Add active to target
    var target = $(e.currentTarget);
    target.addClass('active');

    // Get All Messages
    $.get('/admin/conversation/view/' + target.find('input').val())
        .success(con => {
            current_conversation_id = con._id;
            $('.contact-profile img').attr('src', '/images/user/' + con.user.image);
            $('.contact-profile p').text(con.user.name);

            var html = '';
            con.messages.forEach(mes => {
                html +=
                    `<li class="${mes.from_customer ? 'sent' : 'replies'}">
                        <img src="/images/user/${mes.from_customer ? con.user.image : admin_image}" />
                        <p>${mes.content}</p>
                    </li>`
                ;
            });
            $('div.messages ul').html(html);
        })
    ;
});
function removeActive() {
    $('li.contact.active').removeClass('active');
}
// END My Custom