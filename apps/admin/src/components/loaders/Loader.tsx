import clsx from 'clsx';

// STYLES
import styles from 'src/components/loaders/styles.module.scss';

export const Loader = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => (
	<p className={clsx(styles.loader, { [styles[size]]: true })} />
);
