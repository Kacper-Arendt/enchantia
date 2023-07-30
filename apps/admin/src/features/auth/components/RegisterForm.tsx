import { useTranslation } from 'react-i18next';

// HOOKS

// MODELS

// COMPONENTS

// STYLES
import styles from 'src/features/auth/components/styles.module.css';

export const RegisterForm = () => {
	const { t } = useTranslation();

	return (
		<div className={styles.registerForm}>
			<h1>{t('routes.register')}</h1>

			<form />
		</div>
	);
};
