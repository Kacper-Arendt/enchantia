import { Story, StoryTranslation } from 'database';

type CreateStoryDto = Pick<Story, 'ownerId' | 'name'>;

export const createStoryDto = (story: CreateStoryDto): CreateStoryDto => ({
	ownerId: story?.ownerId,
	name: story?.name,
});

export const getStoryDto = (story: Story): Partial<Story> => ({
	id: story.id,
	name: story.name,
	ownerId: story.ownerId,
});

type CreateStoryContentDtoType = Pick<StoryTranslation, 'content' | 'storyId' | 'language' | 'description' | 'title'>;

export const createStoryContentDto = (translation: CreateStoryContentDtoType): CreateStoryContentDtoType => ({
	title: translation.title,
	content: translation.content,
	storyId: translation.storyId,
	language: translation.language,
	description: translation.description,
});

export const getStoryContentDto = (
	translation: StoryTranslation,
): Pick<StoryTranslation, 'title' | 'content' | 'storyId' | 'language' | 'description' | 'id' | 'status' | 'createdAt'> => ({
	title: translation.title,
	content: translation.content,
	storyId: translation.storyId,
	language: translation.language,
	description: translation.description,
	id: translation.id,
	status: translation.status,
	createdAt: translation.createdAt,
});
