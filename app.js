const express = require('express');
const app = express();
const mongoose = require('mongoose');
const configs = require('./config/index.js');
const userRouter = require('./modules/users/user.router');
const betRouter = require('./modules/bets/bet.router');
const rollRouter = require('./modules/rolls/roll.router');


mongoose.connect(configs.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
// API routers
app.use('/api/users', userRouter.router);
app.use('/api/bets', betRouter.router);
app.use('/api/rolls', rollRouter.router);

// Static file router
app.use('/', express.static(__dirname + '/view'));
// app.listen(configs.PORT, function() {
//     console.log(`Server listening on port ${configs.PORT}`);
// });

const http = require('http').Server(app);
const io = require('socket.io')(http);

// Chat socket
io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(configs.PORT, function() {
    console.log(`listening on *:${configs.PORT}`);
});