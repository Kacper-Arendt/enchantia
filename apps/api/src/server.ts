import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

// UTILS
import { errorHandler } from 'src/utils/errorHandler';

// ROUTES
import { routes } from 'src/routes';

export const createServer = () => {
	const app = express();

	app
		.disable('x-powered-by')
		.use(morgan('dev'))
		.use(helmet())
		.use(cors())
		.use(express.urlencoded())
		.use(express.json())
		.use('/', routes)
		.get('*', (req, res) => {
			res.status(404).send({ error: 'unknown endpoint' });
		})
		.use(errorHandler);

	return app;
};
