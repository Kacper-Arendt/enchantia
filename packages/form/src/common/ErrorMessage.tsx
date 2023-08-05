import { FieldError } from 'react-hook-form';

// STYLES
import styles from './styles.module.css';

export interface ErrorMessageInterface {
	error?: FieldError;
}

export const ErrorMessage = ({ error }: { error: FieldError | undefined }) => {
	if (!error) return null;

	return <span className={styles.fieldError}>{error.message}</span>;
};
