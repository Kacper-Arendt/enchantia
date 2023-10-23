import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query';

// API
import { client } from 'src/lib/axios';

// MODELS
import { StoriesInterface } from 'src/features/stories/models/stories';

// UTILS
import { logger } from 'src/utils/logger';

interface GetUserStoriesInterface {
	signal: AbortSignal | undefined;
}

export const getUserStories = async ({ signal }: GetUserStoriesInterface): Promise<StoriesInterface[]> => {
	try {
		return await client.get(`/stories/admin`, { signal });
	} catch (e) {
		logger.error('getUserRepos', e);
		return [];
	}
};

type QueryFnType = typeof getUserStories;

type UseUserStoriesOptions = {
	config?: QueryConfig<QueryFnType>;
};

export const useUserStories = ({ config }: UseUserStoriesOptions) =>
	useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryFn: ({ signal }) => getUserStories({ signal }),
		queryKey: ['stories'],
	});
