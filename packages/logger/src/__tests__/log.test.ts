import { logger } from '..';

jest.spyOn(global.console, 'log');

describe('logger', () => {
	it('prints a log message', () => {
		logger.log('logger log test =>', 'log');
		// eslint-disable-next-line no-console
		expect(console.log).toHaveBeenCalled();
	});

	it('prints a error message', () => {
		logger.error('logger error test =>', 'error');
		// eslint-disable-next-line no-console
		expect(console.log).toHaveBeenCalled();
	});
});
