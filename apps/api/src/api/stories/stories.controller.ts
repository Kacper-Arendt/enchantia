import { NextFunction, Request, Response } from 'express';
import {
	createStoryContentService,
	createStoryService,
	getAllPublishedStory,
	getAllStoryByOwnerIdService,
	getStoryService,
} from 'src/api/stories/stories.services';
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

export const getStory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req?.params;

		const data = await getStoryService({ id });

		if (!data) return res.status(404).json({ message: 'Story not found' });

		const formattedData = {
			...getStoryDto(data),
			translations: data?.translations?.map((el) => getStoryContentDto(el)) ?? [],
		};

		return res.status(200).json(formattedData);
	} catch (e) {
		next(e);
	}
};

export const getAllUserStories = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req?.payload ?? {};

		const data = await getAllStoryByOwnerIdService({ ownerId: userId });

		const formattedData = data.map((el) => ({
			...getStoryDto(el),
			translations: el?.translations?.map((el) => getStoryContentDto(el)) ?? [],
		}));

		return res.status(200).json(formattedData);
	} catch (e) {
		next(e);
	}
};

export const getAllPublishedStories = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await getAllPublishedStory();

		const formattedData = data.map((el) => ({
			...getStoryDto(el),
			translations: el?.translations?.map((el) => getStoryContentDto(el)) ?? [],
		}));

		return res.status(200).json(formattedData);
	} catch (e) {
		next(e);
	}
};
