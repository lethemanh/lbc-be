const rollResult = require('../helper/rollResult');
const calculateMultipleResults = require('../helper/calculateMultipleResults');
const { SECRET_KEY, TIME_LEFT_DEFAULT, PENDING_COUNTDOWN_TIME, COUNTDOWN_INTERVAL_SECOND } = require('../config');
const jwt = require('jsonwebtoken');
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

  io.use(async function (socket, next) {
    try {
      if (socket.handshake.query.token) {
        const token = socket.handshake.query.token;
        const data = await jwt.verify(token, SECRET_KEY);
        
        if (!data) {
          return next(new Error("Not authenticated!"));
        }
        if (data.exp <= Date.now() / 1000) {
          return next(new Error("Token expired!"));
        }
        socket.user = {
          _id: data._id,
          email: data.email,
          phoneNumber: data.phoneNumber,
          role: data.role
        };
        return next();
      }
      return next(new Error("Not authenticated!"));
    } catch (err) {
      return next(err);
    }
  }).on('connection', (socket) => {
    connectedUsers.push(socket.user._id);
    userIds = _.uniqBy(connectedUsers);
    
    userConnectedCounter++;
    if (!timeInterval) {
      timeInterval = setInterval(countdown, COUNTDOWN_INTERVAL_SECOND);
    }
    socket.on('disconnect', () => {
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
  });
}

module.exports = activateSocket;