import { useFormContext } from 'react-hook-form';

// STYLES
import styles from 'src/components/form/common/styles.module.scss';

export const FieldError = ({ name }: { name?: string }) => {
	const {
		formState: { errors },
	} = useFormContext();

	if (!name) return null;

	const error = errors[name];

	if (!error) return null;

	return (
		<p className={styles.fieldError}>
			<>{error.message}</>
		</p>
	);
};
