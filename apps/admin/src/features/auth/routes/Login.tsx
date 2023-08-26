import { useNavigate } from '@tanstack/router';

// COMPONENTS
import { Layout, LoginForm } from 'src/features/auth/components';

export const Login = ({ navigateOnSuccess }: { navigateOnSuccess: boolean }) => {
	const navigate = useNavigate({ from: '/auth/login' });

	return (
		<Layout>
			<LoginForm onFinish={navigateOnSuccess ? () => navigate({ to: '/' }) : undefined} />
		</Layout>
	);
};
