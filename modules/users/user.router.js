const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.get('/', async function(req, res) {
	try {
		const data = await userService.find(req.query, Number(req.query.limit), Number(req.query.offset), req.user);
		res.status(200).json({data: data});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
});

router.post('/', async function(req, res) {
	try {
		const result = await userService.create(req.body, req.user);
		res.status(200).json({data: result});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
});

router.put('/:id', async function(req, res) {
	try {
		const result = await userService.update(req.params.id, req.body, req.user);
		res.status(200).json({data: result});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
});

router.delete('/:id', async function(req, res) {
	try {
		await userService.remove(req.params.id, req.user);
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