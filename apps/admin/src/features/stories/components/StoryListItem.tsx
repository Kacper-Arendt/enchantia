// REDUX

// HOOKS

// MODELS
import { StoriesInterface } from 'src/features/stories/models/stories';

// COMPONENTS

// STYLES
import styles from 'src/features/stories/components/Styles.module.scss';

// UTILS

export const StoryListItem = ({ name, translations }: StoriesInterface) => {
	return (
		<div className={styles.storyListItem}>
			<p className={styles.name}>{name}</p>
			<span>Translations: {translations?.map((el) => el.language).join(', ') || '-'}</span>
		</div>
	);
};
