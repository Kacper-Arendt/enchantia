import { ServerType, startServer } from 'src/testUtils/helpers';

describe('server', () => {
	let request: ServerType;

	beforeEach(async () => (request = await startServer()));

	it('should return 404 on unknown endpoint', async () => {
		request
			.get('/xyv')
			.expect(404)
			.then((res) => {
				expect(res.body.error).toBe('unknown endpoint');
			});
	});
});
