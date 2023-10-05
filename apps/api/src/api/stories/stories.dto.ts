import { Story } from 'database';

export const storyDto = (story: Story): Story => ({
	id: story?.id,
	ownerId: story?.ownerId,
	name: story?.name,
});
