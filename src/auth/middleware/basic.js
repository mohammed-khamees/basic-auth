'use strict';

const base64 = require('base-64');
const { getUser } = require('./../../model/userCollections');

module.exports = async function (req, res, next) {
	let basicHeaderParts = req.headers.authorization.split(' ');
	let encodedString = basicHeaderParts.pop();
	let decodedString = base64.decode(encodedString);
	let [username, password] = decodedString.split(':');

	if (username && password) {
		let user = await getUser(username, password);
		if (user) {
			req.user = user;
			next();
		} else {
			res.status(403).send('Please Sign Up first');
		}
	} else {
		next('Invalid User or password');
	}
};
