const express = require('express');
const router = express.Router();
const service = require('./user.service');

router.get('/', async function(req, res) {
    try {
        const data = await service.find(req.body, Number(req.query.limit), Number(req.query.offset));
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async function(req, res) {
    try {
        const result = await service.create(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async function(req, res) {
    try {
        const result = await service.update(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async function(req, res) {
    try {
        await service.remove(req.params.id);
        res.send('OK');
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = {
    router: router
};