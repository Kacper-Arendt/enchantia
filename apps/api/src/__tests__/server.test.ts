import { ServerType, startServer } from 'src/__testUtils__/helpers';

let request: ServerType;

beforeEach(async () => (request = await startServer()));

describe('server', () => {
	it('Returns 400 when endpoint is invalid', async () => {
		const response = await request.get('/api');

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty('error', 'unknown endpoint');
	});
});
