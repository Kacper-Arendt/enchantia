// HOOKS
import { useAuth } from 'src/features/auth/hooks/useAuth';

// COMPONENTS
import { Button } from 'src/ui';

export const Dashboard = () => {
	const { logout } = useAuth();

	return (
		<>
			<Button onClick={logout}>Logout</Button>
		</>
	);
};
