import { ReactNode } from 'react';

// COMPONENTS
import { AppLangSelect } from 'src/components/internalization';

// STYLES
import styles from 'src/features/auth/components/styles.module.scss';

export const Layout = ({ children }: { children: ReactNode }) => (
	<div className={styles.layout}>
		<AppLangSelect wrapperClassName={styles.appLangSelect} />
		{children}
	</div>
);
