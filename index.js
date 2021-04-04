'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const { start } = require('./src/server.js');

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB... ');
		start(process.env.PORT || 3000);
	})
	.catch((e) => console.error('Could not start server', e.message));
