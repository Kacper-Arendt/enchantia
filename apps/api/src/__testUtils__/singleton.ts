/* eslint-disable */

import { PrismaClient } from 'database';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import prisma from 'src/__testUtils__/client';

jest.mock('./client', () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
	mockReset(prismaMock);
});

global.jest = jest;

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
