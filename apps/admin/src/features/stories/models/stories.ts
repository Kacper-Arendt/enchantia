export interface StoriesInterface {
	id: string;
	name: string;
	ownerId: string;
	translations: TranslationsInterface[];
}

export interface TranslationsInterface {
	content: string;
	createdAt: string;
	description: string;
	id: string;
	language: string;
	status: string;
	storyId: string;
	title: string;
}
