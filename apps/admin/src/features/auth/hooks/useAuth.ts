import { toast } from 'react-toastify';
import { useNavigate } from '@tanstack/router';

// API
import { RegisterCredentialsInterface, registerWithEmailAndPassword } from 'src/features/auth/api/register';

// MODELS
import { AuthResponseInterface } from 'src/features/auth/models';

// STORE
import { useAppStore } from 'src/store';

export const useAuth = () => {
	const { accessToken, addAccessToken, clearAccessToken, clearRefreshToken, addRefreshToken } = useAppStore((state) => state);

	const navigate = useNavigate();

	const handleUserResponse = async (data: AuthResponseInterface) => {
		const { accessToken, refreshToken } = data;
		addAccessToken(accessToken);
		addRefreshToken(refreshToken);
	};

	const register = async (data: RegisterCredentialsInterface, onFinish: () => void) => {
		try {
			const response = await registerWithEmailAndPassword(data);
			await handleUserResponse(response);
			onFinish();
		} catch (e: any) {
			toast.error(e.response.data.message);
		}
	};

	const logout = () => {
		clearAccessToken();
		clearRefreshToken();
		navigate({ to: '/auth/register' });
	};

	const checkIsAuthenticated = () => Boolean(accessToken);

	return { register, logout, checkIsAuthenticated };
};
