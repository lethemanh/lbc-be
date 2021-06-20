var socket = io.connect('http://localhost:3000');

// submit text message without reload/refresh the page
$('form').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat_message', $('#txt').val());
    $('#txt').val('');
    return false;
});

// append the chat text message
socket.on('chat_message', function (msg) {
    $('.chats').append($('<div class="client-chat">').html(msg));
});

// append text if someone is online
socket.on('is_online', function (username) {
    $('.chats').append($('<div class="client-chat">').html(username));
});

// ask username
var username = prompt('Please tell me your name');
socket.emit('username', username);