import { createServer } from 'src/server';
import supertest from 'supertest';

export const startServer = async () => await supertest(createServer());

export type ServerType = supertest.SuperTest<supertest.Test>;

export const createMockUser = () => ({
	name: 'JohnDoe',
	password: 'testPassword',
	email: 'test@enchantia.com',
});
