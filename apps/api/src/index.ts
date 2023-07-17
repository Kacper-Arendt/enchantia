import { createServer } from 'src/server';

// CONFIG
import { envs } from 'src/config';

// UTILS
import { logger } from 'logger';

const port = envs.port || 5001;
const server = createServer();

server.listen(port, () => {
	logger.log('api index', `api running on ${port}`);
});
