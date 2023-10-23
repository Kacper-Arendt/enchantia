// REDUX

// HOOKS
import { useUserStories } from 'src/features/stories/api/getStories';

// MODELS

// COMPONENTS
import { StoryListItem } from 'src/features/stories/components/StoryListItem';

// STYLES
import styles from 'src/features/stories/components/Styles.module.scss';

// UTILS

export const StoriesList = () => {
	const { data } = useUserStories({ config: {} });

	return <div className={styles.storiesList}>{data && data?.map((story) => <StoryListItem key={story.id} {...story} />)}</div>;
};
