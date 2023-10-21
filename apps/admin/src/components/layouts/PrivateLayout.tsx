import { ErrorBoundary } from 'react-error-boundary';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Outlet } from '@tanstack/router';
import { AiOutlineClose } from 'react-icons/ai';

// HOOKS
import { useOnClickOutside } from 'src/utils/useClickOutside';

// COMPONENTS
import { FallbackError } from 'src/components/errors';

// STYLES
import styles from 'src/components/layouts/Styles.module.scss';

// CONFIG
import { envs } from 'src/config/envs';

export const PrivateLayout = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [openAside, setOpenAside] = useState(false);
	useOnClickOutside(ref, () => setOpenAside(false));

	return (
		<ErrorBoundary FallbackComponent={FallbackError}>
			<div className={styles.privateLayout}>
				<ErrorBoundary FallbackComponent={FallbackError}>
					<header className={styles.header}>
						<button type="button" onClick={() => setOpenAside(true)} className={styles.toggleNavButton}>
							<RxHamburgerMenu />
						</button>
						{envs.appName && <h3 className={styles.appName}>{envs.appName}</h3>}
					</header>
				</ErrorBoundary>

				<ErrorBoundary FallbackComponent={FallbackError}>
					<aside className={clsx(styles.aside, { [styles.openAside]: openAside })} ref={ref}>
						<div className={styles.asideHeader}>
							{envs.appName && <h3 className={styles.appName}>{envs.appName}</h3>}
							<button type="button" onClick={() => setOpenAside(false)} className={styles.toggleNavButton}>
								<AiOutlineClose />
							</button>
						</div>
					</aside>
				</ErrorBoundary>

				<ErrorBoundary FallbackComponent={FallbackError}>
					<main>
						<Outlet />
					</main>
				</ErrorBoundary>
			</div>
		</ErrorBoundary>
	);
};
