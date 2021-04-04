'use strict';

const { app } = require('./../src/server');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(app);
let id;

describe('testing the user', () => {
	it('should create a new User on POST /signup', async () => {
		const response = await request.post('/signup').send({
			username: 'mohammed',
			password: '123456',
		});
		expect(response.status).toEqual(201);
		expect(response.body.username).toEqual('mohammed');
	});

	it('should the user login on POST /signin', async () => {
		const response = await request.post('/signup').send({
			username: 'mohammed',
			password: '123456',
		});

		const { username, password } = response.body;

		const response2 = await request
			.post('/signin')
			.set(
				'Authorization',
				'basic ' + new Buffer(`${username}:${password}`).toString('base64'),
			);

		expect(response2.status).toEqual(200);
	});

	it('handle invalid routes', async () => {
		const response = await request.get(`/foo`);
		expect(response.status).toEqual(404);
	});

	it('handle server errors', async () => {
		const response = await request.put('/bad');
		expect(response.status).toEqual(500);
	});
});
