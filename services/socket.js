const { TIME_LEFT_DEFAULT, PENDING_COUNTDOWN_TIME, COUNTDOWN_INTERVAL_SECOND } = require('../config');

const activateSocket = (io) => {
  let timeLeft = TIME_LEFT_DEFAULT;
  let timeInterval;
  let userConnectedCounter = 0;

  const countdown = () => {
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      io.emit('processing-result');
      //Calculate result
      setTimeout(() => {
        timeLeft = TIME_LEFT_DEFAULT;
        countdown();
        timeInterval = setInterval(countdown, COUNTDOWN_INTERVAL_SECOND);
        io.emit('finish-result');
      }, PENDING_COUNTDOWN_TIME);
    }
    io.emit('tick', timeLeft);
    timeLeft--;
  }

  io.on('connection', (socket) => {
    userConnectedCounter++;
    if (!timeInterval) {
      timeInterval = setInterval(countdown, COUNTDOWN_INTERVAL_SECOND);
    }
    socket.on('disconnect', (socket) => {
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