import { ErrorBoundary } from 'react-error-boundary';
import { useState } from 'react';
import { Outlet } from '@tanstack/react-router';

// COMPONENTS
import { FallbackError } from 'src/components/errors';
import { PrivateLayoutAside } from 'src/components/layouts/PrivateLayoutAside';
import { PrivateLayoutHeader } from 'src/components/layouts/PrivateLayoutHeader';

// STYLES
import styles from 'src/components/layouts/Styles.module.scss';

export const PrivateLayout = () => {
	const [openAside, setOpenAside] = useState(false);

	return (
		<ErrorBoundary FallbackComponent={FallbackError}>
			<div className={styles.privateLayout}>
				<PrivateLayoutHeader setOpenAside={setOpenAside} />
				<PrivateLayoutAside isOpen={openAside} setIsOpen={setOpenAside} />

				<ErrorBoundary FallbackComponent={FallbackError}>
					<main>
						<Outlet />
					</main>
				</ErrorBoundary>
			</div>
		</ErrorBoundary>
	);
};
