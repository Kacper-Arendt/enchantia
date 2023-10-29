import { t } from 'i18next';

// HOOKS
import { useStoryData } from 'src/features/stories/context/storyContext';

// STYLES
import styles from 'src/features/stories/components/Styles.module.scss';

export const StoryHeader = () => {
	const { data } = useStoryData();

	if (!data) return null;

	return (
		<div className={styles.storiesListHeader}>
			<p>{t('general.title')}</p>
			<span>{data.name}</span>
		</div>
	);
};
