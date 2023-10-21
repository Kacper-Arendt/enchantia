import { t } from 'i18next';

// STYLES
import styles from 'src/components/errors/styles.scss';

export const FallbackError = () => (
	<div className={styles.fallbackError}>
		<h2>{t('errors.fallbackErrorMessage')}</h2>
	</div>
);
