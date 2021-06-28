const express = require('express');
const router = express.Router();
const service = require('./user.service');
const validate = require('./user.validation');
const {validationResult} = require('express-validator');

router.get('/', async function(req, res) {
    try {
        const data = await service.find(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/register', validate.register() , async function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

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