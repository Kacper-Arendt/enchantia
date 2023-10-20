import { FieldError } from 'react-hook-form';

// STYLES
import styles from 'src/components/form/common/styles.module.scss';

export interface ErrorMessageInterface {
	error?: FieldError;
}

export const ErrorMessage = ({ error }: { error: FieldError | undefined }) => {
	if (!error) return null;

	return <span className={styles.fieldError}>{error.message}</span>;
};
