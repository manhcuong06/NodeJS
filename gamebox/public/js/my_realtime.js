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

    socket.on('reload_top_games', (game) => {
        html = "<li id=" + game._id + ">";
        html += "<div class='game-grid'>";
        html += "<h4>" + game.name + "</h4>";
        html += "<p>" + game.description + "</p>";
        html += "<a href='/site/detail/" + game._id + "'>";
        html += "<img src='/images/product/" + game.image + "' class='img-responsive' alt=''/>";
        html += "</a>";
        html += "</div>";
        html += "<button class='btn btn-primary btn-block' id='up_button' onclick='updateCart('" + game._id + "')'>Buy (" + game.price + ")$</button>";
        html += "</li>";
        var current_top_games = $('#flexiselDemo1 li');
        var sum = $('#flexiselDemo1 li').length;
        var new_top_games = [];
        for (var i = 0; i < sum; i++) {
            if (i == 0 || i == (sum / 2) - 1) {
                current_top_games[i].innerHTML = html;
                new_top_games.push(current_top_games[i]);
            } else {
                new_top_games.push(current_top_games[i]);
            }
        }
        $('top-game-grids').empty();
        $('top-game-grids').html(new_top_games);
    });

    socket.on('update_for_top_games', (data_new) => {
        var id_update = data_new.condition;
        var game = data_new.data_post;
        html = "<li id=" + id_update._id + ">";
        html += "<div class='game-grid'>";
        html += "<h4>" + game.name + "</h4>";
        html += "<p>" + game.description + "</p>";
        html += "<a href='/site/detail/" + id_update._id + "'>";
        html += "<img src='/images/product/" + game.image + "' class='img-responsive' alt=''/>";
        html += "</a>";
        html += "</div>";
        html += "<button class='btn btn-primary btn-block' id='up_button' onclick='updateCart('" + id_update._id + "')'>Buy (" + game.price + ")$</button>";
        html += "</li>";
        var sum = $('#flexiselDemo1 li').length;
        var old_top_games = $('#flexiselDemo1 li');
        var current_top_games = $('#flexiselDemo1 li');
        var id_for_search = id_update._id;
        var new_top_games = [];
        var id_found = 'not_found';
        for (var i = 0; i < sum; i++) {
            Array(current_top_games).forEach((e) => {
                var index = e[i].id.indexOf(id_for_search);
                if (~index) {
                    e[i].innerHTML = html;
                    id_found = 'found';
                }
            });
        }
        for (i = 0; i < sum; i++) {
            new_top_games.push(current_top_games[i]);
        }
        if (id_found.localeCompare('found') == 0) {
            $('top-game-grids').empty();
            $('top-game-grids').html(new_top_games);
        } else {
            $('top-game-grids').empty();
            $('top-game-grids').html(old_top_games);
        }
    });

    socket.on('delete_for_top_games', (game) => {
        var sum = game.length * 2;
        var current_top_games = $('#flexiselDemo1 li');
        var j = 0;
        for (i = 0; i < sum; i++) {
            if (i < (sum / 2)) {
                html = "<li id=" + game[i]._id + ">";
                html += "<div class='game-grid'>";
                html += "<h4>" + game[i].name + "</h4>";
                html += "<p>" + game[i].description + "</p>";
                html += "<a href='/site/detail/" + game[i]._id + "'>";
                html += "<img src='/images/product/" + game[i].image + "' class='img-responsive' alt=''/>";
                html += "</a>";
                html += "</div>";
                html += "<button class='btn btn-primary btn-block' id='up_button' onclick='updateCart('" + game[i]._id + "')'>Buy (" + game[i].price + ")$</button>";
                html += "</li>";
                current_top_games[i].innerHTML = html;
            } else {
                html = "<li id=" + game[j]._id + ">";
                html += "<div class='game-grid'>";
                html += "<h4>" + game[j].name + "</h4>";
                html += "<p>" + game[j].description + "</p>";
                html += "<a href='/site/detail/" + game[j]._id + "'>";
                html += "<img src='/images/product/" + game[j].image + "' class='img-responsive' alt=''/>";
                html += "</a>";
                html += "</div>";
                html += "<button class='btn btn-primary btn-block' id='up_button' onclick='updateCart('" + game[j]._id + "')'>Buy (" + game[j].price + ")$</button>";
                html += "</li>";
                current_top_games[i].innerHTML = html;
                j += 1;
            }
        }
        var new_tg = [];
        for (i = 0; i < sum; i++) {
            new_tg.push(current_top_games[i]);
        }
        $('top-game-grids').empty();
        $('top-game-grids').html(new_tg);
    });
});
