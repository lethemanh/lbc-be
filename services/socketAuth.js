const { SECRET_KEY } = require('../config');
const jwt = require('jsonwebtoken');

const socketAuth = async function (socket, next) {
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
        username: data.username,
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
}

  module.exports = socketAuth;