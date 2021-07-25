const express = require('express');
const router = express.Router();
const roleService = require('./role.service');

router.get('/', async function(req, res) {
  try {
    const data = await roleService.find(req.query, req.user);
    res.status(200).json({data: data});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post('/', async function(req, res) {
  try {
    const result = await roleService.create(req.body, req.user);
    res.status(200).json({data: result});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.put('/:id', async function(req, res) {
  try {
    const result = await roleService.update(req.params.id, req.body, req.user);
    res.status(200).json({data: result});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.delete('/:id', async function(req, res) {
  try {
    await roleService.remove(req.params.id, req.user);
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