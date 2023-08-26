import { useNavigate } from '@tanstack/router';

// COMPONENTS
import { Layout } from 'src/features/auth/components';

export const Login = ({ navigateOnSuccess }: { navigateOnSuccess: boolean }) => {
	const navigate = useNavigate({ from: '/auth/login' });

	return <Layout>x</Layout>;
};
