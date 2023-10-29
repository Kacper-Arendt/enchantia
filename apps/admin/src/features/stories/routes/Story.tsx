import { useParams } from '@tanstack/react-router';

// COMPONENTS
import { QueryBoundaries } from 'src/components/errors/QueryBoundary';
import { ContextProvider } from 'src/features/stories/context/storyContext';
import { StoryHeader } from 'src/features/stories/components';

// STYLES
import styles from 'src/features/stories/routes/styles.module.scss';

export const Story = () => {
	const { id } = useParams({ from: '/private/stories' });

	return (
		<QueryBoundaries>
			<ContextProvider id={id}>
				<div className={styles.storyWrapper}>
					<StoryHeader />
				</div>
			</ContextProvider>
		</QueryBoundaries>
	);
};
