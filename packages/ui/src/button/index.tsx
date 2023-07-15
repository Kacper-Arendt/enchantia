import MuiButton, { ButtonProps } from '@mui/base/Button';

interface ButtonInterface extends ButtonProps {
	variant?: 'outlined' | 'contained' | 'text';
	size?: 'sm' | 'md' | 'lg';
	loading?: boolean;
}

// TODO add styles
export const Button = ({ children, loading, ...rest }: ButtonInterface) => (
	<MuiButton {...rest}>
		{children}
		{/*TODO add icon*/}
		{loading && '...'}
	</MuiButton>
);
