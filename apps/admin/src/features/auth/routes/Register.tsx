import { useNavigate } from '@tanstack/router';

// COMPONENTS
import { Layout, RegisterForm } from 'src/features/auth/components';

export const Register = () => {
	const navigate = useNavigate({ from: '/auth/register' });

	return (
		<Layout>
			<RegisterForm onFinish={() => navigate({ to: '/dashboard' })} />
		</Layout>
	);
};
