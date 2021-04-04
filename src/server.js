'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFoundHndler = require('./middleware/404');
const errorHandler = require('./middleware/500');
const userRouter = require('./auth/router');

const app = express();

//global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/', userRouter);

app.use('/bad', (res, req) => {
	throw new Error();
});

app.use('*', notFoundHndler);
app.use(errorHandler);

function start(port) {
	app.listen(port, console.log(`Listening on PORT ${port}`));
}

module.exports = {
	app,
	start,
};


