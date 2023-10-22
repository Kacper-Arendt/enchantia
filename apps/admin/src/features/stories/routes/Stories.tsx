// REDUX

// HOOKS

// MODELS

// COMPONENTS
import { StoriesList } from 'src/features/stories/components';
import { QueryBoundaries } from 'src/components/errors/QueryBoundary';

// STYLES

// UTILS

export const Stories = () => {
	return (
		<>
			<QueryBoundaries>
				<StoriesList />
			</QueryBoundaries>
		</>
	);
};
