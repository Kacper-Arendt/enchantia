import { createServer } from 'src/server';
import supertest from 'supertest';

export const startServer = async () => await supertest(createServer());

export type ServerType = supertest.SuperTest<supertest.Test>;

export const createMockUser = () => ({
	name: 'JohnDoe',
	password: 'testPassword',
	email: 'test@enchantia.com',
});

export const loginUserMock = async (): Promise<{ accessToken: string; refreshToken: string }> => {
	const request = await startServer();
	const response = await request.post('/api/v1/auth/login').send({
		password: 'testPassword',
		email: 'test1@enchantia.com',
	});

	return response.body;
};
