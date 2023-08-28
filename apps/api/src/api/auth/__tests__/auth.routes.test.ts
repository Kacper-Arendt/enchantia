import { createMockUser, loginUserMock, ServerType, startServer } from 'src/__testUtils__/helpers';
import { deleteUserByEmail } from 'src/api/users/users.services';

const user = createMockUser();

let request: ServerType;

beforeAll(async () => {
	request = await startServer();
	// await deleteUserByEmail(user.email);
});

afterAll(async () => {
	await deleteUserByEmail(user.email);
});

describe('Register route', () => {
	it('should return error with status 400 when there is no email', async () => {
		const response = await request.post('/api/v1/auth/register').send({ password: user.password });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'You must provide an email, password, and name');
	});

	it('should return error with status 400 when there is no password', async () => {
		const response = await request.post('/api/v1/auth/register').send({ email: user.email });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'You must provide an email, password, and name');
	});

	it('should return error with status 400 when password is to short', async () => {
		const response = await request.post('/api/v1/auth/register').send({
			email: user.email,
			password: '1234',
			name: 'john',
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'Password must be at least 6 characters.');
	});

	it('should create new user and  return tokens', async () => {
		const response = await request.post('/api/v1/auth/register').send({
			email: user.email,
			password: user.password,
			name: user.name,
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('accessToken');
		expect(response.body).toHaveProperty('refreshToken');
		expect(response.body).toHaveProperty('id');
	});
});

describe('Login route', () => {
	it('should return error with status 400 when there is no email', async () => {
		const response = await request.post('/api/v1/auth/login').send({ password: user.password });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'You must provide an email and a password.');
	});

	it('should return error with status 400 when there is no password', async () => {
		const response = await request.post('/api/v1/auth/login').send({ email: user.email });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'You must provide an email and a password.');
	});

	it('should return error with status 400 when there are invalid credentials', async () => {
		const response = await request.post('/api/v1/auth/login').send({
			email: 'enchantiafake@enchantia.com',
			password: user.password,
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'Invalid login credentials.');
	});

	it('should return error with status 403 when there are invalid credentials', async () => {
		const response = await request.post('/api/v1/auth/login').send({
			email: user.email,
			password: 'wrong password',
		});

		expect(response.status).toBe(403);
		expect(response.body).toHaveProperty('message', 'Invalid login credentials.');
	});

	it('should log in an existing user and return access and refresh tokens', async () => {
		const response = await request.post('/api/v1/auth/login').send({ email: user.email, password: user.password });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('accessToken');
		expect(response.body).toHaveProperty('refreshToken');
		expect(response.body).toHaveProperty('id');
	});
});

describe('Refresh token route', () => {
	it('should return error with status 400 when refreshing tokens is missing', async () => {
		const response = await request.post('/api/v1/auth/refreshToken').send();

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message', 'Missing refresh token.');
	});

	it('should refresh tokens and return new access with refresh tokens', async () => {
		const { refreshToken } = await loginUserMock();
		const response = await request.post('/api/v1/auth/refreshToken').send({ refreshToken });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('refreshToken');
		expect(response.body).toHaveProperty('accessToken');
	});
});
