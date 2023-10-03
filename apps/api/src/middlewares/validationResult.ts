import { validationResult as ExpresValidationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export const validationResult = (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = ExpresValidationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	} catch (err: any) {
		res.status(401).json({ name: err?.name, message: err?.message });
	}

	return next();
};
