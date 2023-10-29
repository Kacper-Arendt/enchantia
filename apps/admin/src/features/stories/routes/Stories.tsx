// COMPONENTS
import { StoriesList } from 'src/features/stories/components';
import { QueryBoundaries } from 'src/components/errors/QueryBoundary';

export const Stories = () => (
	<QueryBoundaries>
		<StoriesList />
	</QueryBoundaries>
);
