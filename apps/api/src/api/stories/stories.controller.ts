import { NextFunction, Request, Response } from 'express';
import { createStoryContentService, createStoryService, getStoryService } from 'src/api/stories/stories.services';
import { createStoryContentDto, createStoryDto, getStoryContentDto, getStoryDto } from 'src/api/stories/stories.dto';

export const createStory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.body;
		const { userId } = req?.payload ?? {};

		const data = await createStoryService(createStoryDto({ name, ownerId: userId }));

		return res.status(200).json(getStoryDto(data));
	} catch (e) {
		next(e);
	}
};

export const createStoryContent = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body;

		const data = await createStoryContentService(createStoryContentDto(body));
		const updatedStory = await getStoryService({ id: data?.storyId });
		const translations = updatedStory?.translations?.map((el) => getStoryContentDto(el)) ?? [];

		if (data && updatedStory) return res.status(200).json({ ...createStoryDto(updatedStory), translations });
	} catch (e) {
		next(e);
	}
};
