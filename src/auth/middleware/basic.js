'use strict';

const base64 = require('base-64');
const { getUser } = require('./../../model/userCollections');

module.exports = async function (req, res, next) {
	try {
		let basicHeaderParts = req.headers.authorization.split(' ');
		let encodedString = basicHeaderParts.pop();
		let decodedString = base64.decode(encodedString);
		let [username, password] = decodedString.split(':');

		let user = await getUser(username, password);
		if (typeof user === 'string') return res.status(403).send(user);
		if (!user.username) return res.status(403).send('Please Sign Up first');

		if (username && password) {
			if (user) {
				req.user = user;
				next();
			} else {
				return res.status(403).send('Please Sign Up first');
			}
		} else {
			next('Invalid User or password');
		}
	} catch (error) {
		throw new Error(error.message);
	}
};
