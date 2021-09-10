const express = require('express');
const router = express.Router();
const betService = require('./bet.service');

router.get('/', async function(req, res) {
  try {
    const data = await betService.find(req.body, req.user);
    res.status(200).json({data: data});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get('/user-bet', async function(req, res) {
  try {
    const data = await betService.findBetProcessing(req.user);
    res.status(200).json({data: data});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post('/', async function(req, res) {
  try {
    const result = await betService.create(req.body, req.user);
    res.status(200).json({data: result});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.put('/:id', async function(req, res) {
  try {
    const result = await betService.update(req.params.id, req.body, req.user);
    res.status(200).json({data: result});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.delete('/:id', async function(req, res) {
  try {
    await betService.remove(req.params.id, req.user);
    res.status(200).send({message: 'OK'});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
})

module.exports = {
  router: router
};