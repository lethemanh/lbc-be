const express = require('express');
const router = express.Router();
const authService = require('./auth.service');

router.post('/login', async function(req, res) {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({data: result});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post('/register', async function(req, res) {
  try {
    const result = await authService.register(req.body);
    res.status(200).json({data: result});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = {
    router: router
}