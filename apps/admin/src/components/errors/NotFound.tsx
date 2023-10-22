import { Link } from '@tanstack/react-router';
import { t } from 'i18next';

// STYLES
import styles from 'src/components/errors/styles.scss';

// UTILS

export const NotFound = () => (
	<div className={styles.notFound}>
		<h1 className={styles.title}>{t('errors.pageNotFound')}</h1>
		<p className={styles.description}>{t('errors.pageNotFound-desc')}</p>
		<Link href="/" className={styles.goBack}>
			{t('general.goBackToHomePage')}
		</Link>
	</div>
);
