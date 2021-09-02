const betService = require('../modules/bets/bet.service');
const rollResult = require('../helper/rollResult');
const calculateMultipleResults = require('../helper/calculateMultipleResults');
const { TIME_LEFT_DEFAULT, PENDING_COUNTDOWN_TIME, COUNTDOWN_INTERVAL_SECOND } = require('../config');
const socketAuth = require('./socketAuth');
const MSGTYPE = require('../constants/msgtype');
const _ = require('lodash');

const activateSocket = (io) => {
  let timeLeft = TIME_LEFT_DEFAULT;
  let timeInterval;
  let userConnectedCounter = 0;
  let userIds = [];
  let connectedUsers = [];

  const countdown = async () => {
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      io.emit('processing-result');
      // Server roll result
      await rollResult();

      // Return result to each player
      const returnResult = await calculateMultipleResults(userIds);
      io.emit('return-result-to-player', returnResult);

      setTimeout(() => {
        timeLeft = TIME_LEFT_DEFAULT;
        countdown();
        timeInterval = setInterval(countdown, COUNTDOWN_INTERVAL_SECOND);
        io.emit('finish-result');
      }, PENDING_COUNTDOWN_TIME);
      
      io.emit('show-result');
      setTimeout(() => {
        io.emit('end-show-result');
      }, PENDING_COUNTDOWN_TIME);
    }
    io.emit('tick', timeLeft);
    timeLeft--;
  }

  io.use((socket, next) => socketAuth(socket, next)).on('connection', (socket) => {
    io.emit('connect-success', {
      _id : socket.user._id,
      username: socket.user.username,
      type: MSGTYPE.CONNECT
    });
    connectedUsers.push(socket.user._id);
    userIds = _.uniqBy(connectedUsers);
    userConnectedCounter++;
    if (!timeInterval) {
      timeInterval = setInterval(countdown, COUNTDOWN_INTERVAL_SECOND);
    };
    socket.on('message', (message) => {
      io.emit('chat-message', message);
    });
    socket.on('disconnect', () => {
      io.emit('disconnect-success', 
      {
        _id : socket.user._id,
        username: socket.user.username,
        type: MSGTYPE.DISCONNECT
      }
      );
      indexDisconnectUser = connectedUsers.indexOf(socket.user._id);
      connectedUsers.splice(indexDisconnectUser, 1);
      userIds = _.uniqBy(connectedUsers);
      userConnectedCounter--;
      if (userConnectedCounter === 0) {
        clearInterval(timeInterval);
        timeLeft = TIME_LEFT_DEFAULT;
        timeInterval = undefined;
      }
    });
    socket.on('message', (message) => {
      io.emit('chat-message', {
        message: message,
        username: socket.user.username 
      });
    })
    socket.on('bet', async (data) => {
      const betData = await betService.create(data, socket.user);
      socket.broadcast.emit('broadcast-bet', {
        userId: betData?.users?._id,
        choice: betData.choice,
        amount: betData.amount,
        username: betData?.users?.username
      });
    });
  });
}

module.exports = activateSocket;