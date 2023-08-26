// MODELS

// COMPONENTS
import { Link } from '@tanstack/router';

// STYLES
import styles from 'src/features/auth/components/styles.module.css';

export const AuthLink = ({ text, to }: { text: string; to: '/auth/login' | '/auth/register' }) => (
	<Link to={to} className={styles.redirectLink} preload="intent">
		{text}
	</Link>
);
