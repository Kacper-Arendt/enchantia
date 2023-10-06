import { Story, StoryTranslation } from 'database';
import { db } from 'src/utils';

export const getStoryService = ({ id }: Pick<Story, 'id'>) =>
	db.story.findFirst({
		where: {
			id,
		},
		include: {
			translations: true,
		},
	});

export const createStoryService = (data: Pick<Story, 'name' | 'ownerId'>) =>
	db.story.create({
		data: { ...data, translations: { create: [] } },
	});

export const getStoryContentService = ({ id }: Pick<StoryTranslation, 'id'>) =>
	db.storyTranslation.findFirst({
		where: { id },
	});

export const createStoryContentService = (
	data: Pick<StoryTranslation, 'content' | 'storyId' | 'language' | 'description' | 'title'>,
) =>
	db.storyTranslation.create({
		data,
	});
