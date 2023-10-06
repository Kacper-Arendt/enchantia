import { createServer } from 'src/server';
import supertest from 'supertest';
import { AuthSuccessInterfaces } from 'src/api/auth/auth.controllers';

export const startServer = async () => await supertest(createServer());

export type ServerType = supertest.SuperTest<supertest.Test>;

export const createMockUser = () => ({
	name: 'JohnDoe',
	password: 'testPassword',
	email: `${Math.random()}@enchantia.com`,
});

export const testUser = {
	id: '279fc2f5-0c04-488f-83ec-86fcd4c33eb4',
	password: 'testPassword',
	email: 'test1@enchantia.com',
	name: 'john',
};

export const RegisterUserMock = async (user: { email: string; password: string; name: string }): Promise<AuthSuccessInterfaces> => {
	const request = await startServer();
	const response = await request.post('/api/v1/auth/register').send(user);

	return response.body;
};

export const loginUserMock = async (): Promise<{ accessToken: string; refreshToken: string }> => {
	const request = await startServer();
	const response = await request.post('/api/v1/auth/login').send({
		password: testUser.password,
		email: testUser.email,
	});

	return response.body;
};
