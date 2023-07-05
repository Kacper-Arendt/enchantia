import { createServer } from './server';
import { logger } from 'logger';

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
	logger.log('api index', `api running on ${port}`);
});
