import { Story, StoryTranslation } from 'database';
import { db } from 'src/utils';

export const createStoryService = (data: Pick<Story, 'name' | 'ownerId'>) =>
	db.story.create({
		data: { ...data, translations: { create: [] } },
	});

export const createStoryContentService = (
	data: Pick<StoryTranslation, 'content' | 'storyId' | 'language' | 'description' | 'title'>,
) =>
	db.storyTranslation.create({
		data,
	});
