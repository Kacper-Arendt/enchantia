import { createServer } from 'src/server';
import supertest from 'supertest';

export const startServer = async () => await supertest(createServer());

export type ServerType = supertest.SuperTest<supertest.Test>;
