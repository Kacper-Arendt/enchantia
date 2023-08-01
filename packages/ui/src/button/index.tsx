import MuiButton, { ButtonProps } from '@mui/base/Button';
import { LuLoader } from 'react-icons/lu';

import styles from './styles.module.css';

interface ButtonInterface extends ButtonProps {
	variant?: 'outlined' | 'contained' | 'text';
	size?: 'sm' | 'md' | 'lg';
	loading?: boolean;
}

export const Button = ({ children, loading, ...rest }: ButtonInterface) => (
	<MuiButton
		{...rest}
		slotProps={{
			root: { className: styles.button },
		}}
	>
		{children}
		{loading && <LuLoader />}
	</MuiButton>
);
