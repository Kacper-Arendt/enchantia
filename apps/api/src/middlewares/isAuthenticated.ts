import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// CONFIG
import { envs } from 'src/config';

// UTILS
import { RefreshTokenPayload } from 'src/utils';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) return res.status(401).json({ message: 'Unauthorized' });

	try {
		const token = authorization.split(' ')[1];
		req.payload = jwt.verify(token, envs.jwtAccessSecret) as RefreshTokenPayload;
	} catch (err: any) {
		res.status(401).json({ name: err.name, message: err.message });
	}

	return next();
};
