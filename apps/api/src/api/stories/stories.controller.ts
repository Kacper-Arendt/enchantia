import { NextFunction, Request, Response } from 'express';
import { createStoryContentService, createStoryService, getStoryService } from 'src/api/stories/stories.services';

export const createStory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.body;
		const { userId } = req?.payload ?? {};

		const data = await createStoryService({ ownerId: userId, name });

		return res.status(200).json(data);
	} catch (e) {
		next(e);
	}
};

export const createStoryContent = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body;

		const data = await createStoryContentService(body);

		if (data) {
			const updatedStory = await getStoryService({ id: data?.storyId });

			return res.status(200).json(updatedStory);
		}
	} catch (e) {
		next(e);
	}
};
