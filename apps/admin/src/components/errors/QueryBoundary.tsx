import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ReactNode, Suspense } from 'react';

const ErrorView = ({ error, resetErrorBoundary }: FallbackProps) => (
	<div>
		<div>{error.message}</div>
		<button type="button" onClick={resetErrorBoundary}>
			Retry
		</button>
	</div>
);

const LoadingView = () => <div>Loading...</div>;

export const QueryBoundaries = ({ children }: { children: ReactNode }) => (
	<QueryErrorResetBoundary>
		{({ reset }) => (
			<ErrorBoundary onReset={reset} FallbackComponent={ErrorView}>
				<Suspense fallback={<LoadingView />}>{children}</Suspense>
			</ErrorBoundary>
		)}
	</QueryErrorResetBoundary>
);
