var socket = null;
$(() => {
    socket = io.connect('http://localhost:3000');
});