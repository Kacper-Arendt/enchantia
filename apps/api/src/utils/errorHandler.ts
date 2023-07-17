import { Response, NextFunction } from 'express';

export const errorHandler = (error: any, res: Response, next: NextFunction) => {
	switch (error?.name) {
		case 'BadRequestError':
			res.status(400).json({ error: 'Bad Request' });
			break;
		case 'UnauthorizedError':
			res.status(401).json({ error: 'Unauthorized' });
			break;
		case 'JsonWebTokenError':
			res.status(401).json({ error: 'Invalid token' });
			break;
		case 'TokenExpiredError':
			res.status(401).json({ error: 'Token expired' });
			break;
		case 'ForbiddenError':
			res.status(403).json({ error: 'Forbidden' });
			break;
		case 'NotFoundError':
			res.status(404).json({ error: 'Not Found' });
			break;
		case 'InternalServerError':
			res.status(500).json({ error: 'Internal Server Error' });
			break;
		default:
			res.status(500).json({ error: 'Unknown Error', errorObj: error });
			break;
	}

	next(error);
};
