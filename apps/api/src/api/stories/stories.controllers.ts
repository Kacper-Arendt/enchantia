import { NextFunction, Request, Response } from 'express';
import { createStoryContentService, createStoryService } from 'src/api/stories/stories.services';

export const createStory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.body;
		const { userId } = req?.payload ?? {};

		const data = await createStoryService({ name, ownerId: userId });

		return res.status(200).json(data);
	} catch (e) {
		next(e);
	}
};

export const createStoryContent = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body;

		const data = await createStoryContentService(body);

		return res.status(200).json(data);
	} catch (e) {
		next(e);
	}
};
