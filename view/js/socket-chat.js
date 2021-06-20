var socket = io.connect('http://localhost:3000');

// submit text message without reload/refresh the page
$('.chat-input').submit(function (e) {
    e.preventDefault();
    socket.emit('chat_message', $('.chat-input input[type="text"]').val());
    $('.chat-input input[type="text"]').val('');
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