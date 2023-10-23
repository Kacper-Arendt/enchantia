import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';

// COMPONENTS
import { FallbackError } from 'src/components/errors';

// STYLES
import styles from 'src/components/layouts/Styles.module.scss';

// UTILS
import { envs } from 'src/config/envs';

export const PrivateLayoutHeader = ({ setOpenAside }: { setOpenAside: (value: boolean) => void }) => (
	<ErrorBoundary FallbackComponent={FallbackError}>
		<header className={styles.header}>
			<button type="button" onClick={() => setOpenAside(true)} className={styles.toggleNavButton}>
				<RxHamburgerMenu />
			</button>
			{envs.appName && (
				<Link to="/" className={styles.appName}>
					{envs.appName}
				</Link>
			)}
		</header>
	</ErrorBoundary>
);
