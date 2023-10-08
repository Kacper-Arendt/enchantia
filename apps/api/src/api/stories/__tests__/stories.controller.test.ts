import { getMockReq, getMockRes } from '@jest-mock/express';

// CONTROLLERS
import { createStory } from 'src/api/stories/stories.controller';

// HELPERS
import { testUser } from 'src/__testUtils__/helpers';

describe('Should create new story', () => {
	xit('create new story', async () => {
		const req = getMockReq({ body: { name: 'test story' }, payload: { userId: testUser.id } });
		const { res, next } = getMockRes();
		await createStory(req, res, next);

		// expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({
				id: expect.any(String),
				name: expect.any(String),
				ownerId: expect.any(String),
				status: expect.stringContaining('DRAFT'),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				publicationDate: expect.any(null),
			}),
		);
	});
});

export {};
