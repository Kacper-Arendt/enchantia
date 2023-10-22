import { ErrorBoundary } from 'react-error-boundary';
import clsx from 'clsx';
import { AiOutlineClose } from 'react-icons/ai';
import { FallbackError } from 'src/components/errors';
import { useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

// HOOKS
import { useAuth } from 'src/features/auth/hooks/useAuth';
import { useOnClickOutside } from 'src/utils/useClickOutside';

// COMPONENTS
import { Button } from 'src/ui';

// STYLES
import styles from 'src/components/layouts/Styles.module.scss';

// UTILS
import { envs } from 'src/config/envs';
import { routes } from 'src/routes';

export const PrivateLayoutAside = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) => {
	const ref = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const { logout } = useAuth();
	useOnClickOutside(ref, () => setIsOpen(false));

	return (
		<ErrorBoundary FallbackComponent={FallbackError}>
			<aside className={clsx(styles.aside, { [styles.openAside]: isOpen })} ref={ref}>
				<div className={styles.asideHeader}>
					{envs.appName && (
						<Link to="/" className={styles.appName}>
							{envs.appName}
						</Link>
					)}
					<button type="button" onClick={() => setIsOpen(false)} className={styles.toggleNavButton}>
						<AiOutlineClose />
					</button>
				</div>

				<nav className={styles.headerNav}>
					{routes.map(({ path, title }) => (
						<Link key={path} to={path} search={{}} params={{}}>
							{t(`routes.${title}`)}
						</Link>
					))}
				</nav>

				<Button onClick={logout}>{t('general.logout')}</Button>
			</aside>
		</ErrorBoundary>
	);
};
