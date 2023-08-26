import { useNavigate } from '@tanstack/router';

// COMPONENTS
import { Layout, RegisterForm } from 'src/features/auth/components';

export const Register = ({ navigateOnSuccess }: { navigateOnSuccess: boolean }) => {
	const navigate = useNavigate({ from: '/auth/register' });

	return (
		<Layout>
			<RegisterForm onFinish={navigateOnSuccess ? () => navigate({ to: '/' }) : undefined} />
		</Layout>
	);
};
