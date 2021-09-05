const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.get('/profile', async function (req, res) {
  try {
    const data = await userService.getProfile(req.user);
    res.status(200).json({data: {
      _id : data ? data._id : null,
      username: data ? data.username : null,
      fullName: data ? data.fullName : null,
      email: data ? data.email : null,
      phoneNumber: data ? data.phoneNumber : null,
      age: data ? data.age : null,
      balance: data ? data.balance : null,
      role: data ? data.role : null
    }});
  } catch (error) {
    res.status(error.status).json({
      message: error.message
    });
  }
});

module.exports = {
  router: router
};