'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic');
const { createUser } = require('./../model/userCollections');

router.post('/signup', async (req, res) => {
	try {
		let record = await createUser(req.body);
		res.status(201).json(record);
	} catch (e) {
		res.status(403).send('Error Creating User');
	}
});

router.post('/signin', basicAuth, async (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		res.status(403).send('Invalid Login');
	}
});

module.exports = router;
