import { ServerType, startServer } from 'src/testUtils/helpers';

const newUser = {
	email: 'enchantia41@enchantia.com',
	password: 'testpassword',
};

let refreshToken = '';
let request: ServerType;

beforeAll(async () => {
	request = await startServer();
});

describe('Register route', () => {
	it('should return error with status 400 when there is no email', async () => {
		const response = await request.post('/api/v1/auth/register').send({ password: newUser.password });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'You must provide an email and a password.');
	});

	it('should return error with status 400 when there is no password', async () => {
		const response = await request.post('/api/v1/auth/register').send({ email: newUser.email });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'You must provide an email and a password.');
	});

	it('should return error with status 400 when password is to short', async () => {
		const response = await request.post('/api/v1/auth/register').send({ email: newUser.email, password: '1234' });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'Password must be at least 6 characters');
	});

	it('should create new user and  return tokens', async () => {
		const response = await request.post('/api/v1/auth/register').send(newUser);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('accessToken');
		expect(response.body).toHaveProperty('refreshToken');
	});
});

describe('Login route', () => {
	it('should return error with status 400 when there is no email', async () => {
		const response = await request.post('/api/v1/auth/login').send({ password: newUser.password });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'You must provide an email and a password.');
	});

	it('should return error with status 400 when there is no password', async () => {
		const response = await request.post('/api/v1/auth/login').send({ email: newUser.email });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'You must provide an email and a password.');
	});

	it('should return error with status 400 when there are invalid credentials', async () => {
		const response = await request.post('/api/v1/auth/login').send({
			email: 'enchantiafake@enchantia.com',
			password: newUser.password,
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'Invalid login credentials.');
	});

	it('should return error with status 403 when there are invalid credentials', async () => {
		const response = await request.post('/api/v1/auth/login').send({
			email: newUser.email,
			password: 'wrong password',
		});

		expect(response.status).toBe(403);
		expect(response.body).toHaveProperty('message', 'Invalid login credentials.');
	});

	it('should log in an existing user and return access and refresh tokens', async () => {
		const response = await request.post('/api/v1/auth/login').send(newUser);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('accessToken');
		expect(response.body).toHaveProperty('refreshToken');

		refreshToken = response.body.refreshToken;
	});
});

describe('Refresh token route', () => {
	it('should return error with status 400 when refreshing tokens is missing', async () => {
		const response = await request.post('/api/v1/auth/refreshToken').send();

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'Missing refresh token.');
	});

	it('should refresh tokens and return new access with refresh tokens', async () => {
		const response = await request.post('/api/v1/auth/refreshToken').send({ refreshToken });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('refreshToken');
		expect(response.body).toHaveProperty('accessToken');
	});
});
