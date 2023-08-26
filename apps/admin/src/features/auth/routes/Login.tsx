import { useNavigate, useSearch } from '@tanstack/router';

// COMPONENTS
import { Layout, LoginForm } from 'src/features/auth/components';

// ROUTER
import { router } from 'src/routes';

export const Login = ({ navigateOnSuccess = true }: { navigateOnSuccess: boolean }) => {
	const navigate = useNavigate({ from: '/auth/login' });
	const search: { redirect: string } = useSearch({ from: '/auth/login' });

	const onFinish = () => {
		if (navigateOnSuccess) {
			if (search?.redirect) router.history.push(search?.redirect);
			else navigate({ to: '/' });
		}
	};

	return (
		<Layout>
			<LoginForm onFinish={onFinish} />
		</Layout>
	);
};
