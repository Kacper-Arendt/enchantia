import { ReactNode } from 'react';

// COMPONENTS
import { ErrorMessage, ErrorMessageInterface } from 'src/components/form/common/ErrorMessage';

// STYLES
import styles from 'src/components/form/common/styles.module.scss';

export interface LabelInterface extends ErrorMessageInterface {
	label?: string;
	id?: string;
	children: ReactNode;
}

export const Label = ({ id, label, children, error }: LabelInterface) => (
	<label htmlFor={id} className={styles.label}>
		{label && <span>{label}</span>}
		{children}
		{error && <ErrorMessage error={error} />}
	</label>
);
