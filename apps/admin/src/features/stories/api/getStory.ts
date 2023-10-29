import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query';

// API
import { client } from 'src/lib/axios';

// MODELS
import { StoriesInterface } from 'src/features/stories/models/stories';

// UTILS
import { logger } from 'src/utils/logger';

interface GetUserStoryInterface {
	signal: AbortSignal | undefined;
	id: string
}

export const getUserStory = async ({ signal, id }: GetUserStoryInterface): Promise<StoriesInterface | null> => {
	try {
		return await client.get(`/stories/admin/${id}`, { signal });
	} catch (e) {
		logger.error('getUserStory', e);
		return null
	}
};

type QueryFnType = typeof getUserStory;

type UseUserStoryOptions = {
	config?: QueryConfig<QueryFnType>;
	id: string
};

export const useUserStory = ({ config, id }: UseUserStoryOptions) =>
	useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryFn: ({ signal }) => getUserStory({ signal, id }),
		queryKey: ['story', id],
	});
