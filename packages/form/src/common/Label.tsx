import { ReactNode } from 'react';

// COMPONENTS
import { ErrorMessage, ErrorMessageInterface } from './ErrorMessage';

// STYLES
import styles from './styles.module.css';

export interface LabelInterface extends ErrorMessageInterface {
	label?: string;
	children: ReactNode;
}

export const Label = ({ label, children, error }: LabelInterface) => (
	<label className={styles.label}>
		{label && <span>{label}</span>}
		{children}
		{error && <ErrorMessage error={error} />}
	</label>
);
