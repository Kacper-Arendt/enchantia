import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from '@tanstack/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

// HOOKS
import { useAuth } from 'src/features/auth/hooks/useAuth';

export const PrivateLayout = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { checkIsAuthenticated } = useAuth();
	const isAuthenticated = checkIsAuthenticated();

	useEffect(() => {
		if (!isAuthenticated) {
			toast.warning(t('general.notAuthenticated'));
			navigate({ to: '/auth/register' });
		}
	}, [isAuthenticated]);

	return (
		<div>
			<Outlet />
		</div>
	);
};
