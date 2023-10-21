import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, Outlet } from '@tanstack/router';
import { AiOutlineClose } from 'react-icons/ai';

// HOOKS
import { useOnClickOutside } from 'src/utils/useClickOutside';

// COMPONENTS
import { FallbackError } from 'src/components/errors';

// STYLES
import styles from 'src/components/layouts/Styles.module.scss';

// CONFIG
import { envs } from 'src/config/envs';
import { Button } from 'src/ui';
import { useAuth } from 'src/features/auth/hooks/useAuth';

export const PrivateLayout = () => {
	const { t } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);
	const [openAside, setOpenAside] = useState(false);

	const { logout } = useAuth();
	useOnClickOutside(ref, () => setOpenAside(false));

	return (
		<ErrorBoundary FallbackComponent={FallbackError}>
			<div className={styles.privateLayout}>
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

				<ErrorBoundary FallbackComponent={FallbackError}>
					<aside className={clsx(styles.aside, { [styles.openAside]: openAside })} ref={ref}>
						<div className={styles.asideHeader}>
							{envs.appName && (
								<Link to="/" className={styles.appName}>
									{envs.appName}
								</Link>
							)}
							<button type="button" onClick={() => setOpenAside(false)} className={styles.toggleNavButton}>
								<AiOutlineClose />
							</button>
						</div>

						<nav className={styles.headerNav}>x</nav>

						<Button onClick={logout}>{t('general.logout')}</Button>
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
