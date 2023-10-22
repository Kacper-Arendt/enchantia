import { Button as MuiButton, ButtonProps } from '@mui/base/Button';
import { LuLoader } from 'react-icons/lu';
import clsx from 'clsx';

// STYLES
import styles from 'src/ui/button/styles.module.scss';

interface ButtonInterface extends ButtonProps {
	variant?: 'outlined' | 'contained' | 'text';
	size?: 'sm' | 'md' | 'lg';
	loading?: boolean;
}

export const Button = ({ children, loading, variant = 'outlined', size = 'md', ...rest }: ButtonInterface) => (
	<MuiButton
		{...rest}
		slotProps={{
			root: {
				className: clsx(styles.button, {
					[styles[variant]]: true,
					[styles[size]]: true,
				}),
			},
		}}
	>
		{children}
		{loading && <LuLoader />}
	</MuiButton>
);
