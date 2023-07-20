import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

// UTILS
import { errorHandler } from 'src/utils/errorHandler';

// ROUTES
import { router } from 'src/api';

export const createServer = () => {
	const app = express();

	app
		.disable('x-powered-by')
		.use(morgan('dev'))
		.use(helmet())
		.use(cors())
		.use(express.urlencoded())
		.use(express.json())
		.use('/api/v1', router)
		.get('*', (req, res) => {
			res.status(404).send({ error: 'unknown endpoint' });
		})
		.use(errorHandler);

	return app;
};
