// REDUX

// HOOKS

// MODELS
import { StoriesInterface } from 'src/features/stories/models/stories';

// COMPONENTS

// STYLES
import styles from 'src/features/stories/components/Styles.module.scss';
import { Link } from '@tanstack/react-router';

// UTILS

export const StoryListItem = ({ id, name, translations }: StoriesInterface) => {
	return (
		<Link
			to="/stories/$id"
			params={{
				id,
			}}
		>
			<div className={styles.storyListItem}>
				<p className={styles.name}>{name}</p>
				<span>Translations: {translations?.map((el) => el.language).join(', ') || '-'}</span>
			</div>
		</Link>
	);
};
