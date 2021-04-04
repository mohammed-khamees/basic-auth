'use strict';

const Users = require('./../model/user');
const bcrypt = require('bcrypt');

const createUser = async function (data) {
	data.password = await bcrypt.hash(data.password, 10);
	const user = new Users(data);
	return await user.save(data);
};

const getUser = async function (username, password) {
	const user = await Users.findOne({ username });
	const valid = await bcrypt.compare(password, user.password);
	if (valid) {
		return user;
	} else {
		return new Error('Invalid User or password');
	}
};

module.exports = { createUser, getUser };
