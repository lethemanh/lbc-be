var socket = io.connect('http://localhost:3000');
$(".scroll").animate({ scrollTop: $(".scroll")[0].scrollHeight}, 1000);

// submit text message without reload/refresh the page
$('.chat-input').submit(function (e) {
    e.preventDefault();
    socket.emit('chat_message', $('.chat-input input[type="text"]').val());
    $('.chat-input input[type="text"]').val('');
});

// append the chat text message
socket.on('chat_message', function (msg) {
    $('.chats').append($('<div class="client-chat">').html(msg));
    $(".scroll").animate({ scrollTop: $(".scroll")[0].scrollHeight}, 1000);
});

// append text if someone is online
socket.on('is_online', function (username) {
    $('.chats').append($('<div class="client-chat">').html(username));
    $(".scroll").animate({ scrollTop: $(".scroll")[0].scrollHeight}, 1000);
});

// ask username
var username = prompt('Please tell me your name');
socket.emit('username', username);