import { toast } from 'react-toastify';
import { useNavigate } from '@tanstack/router';

// API
import { RegisterCredentialsInterface, registerWithEmailAndPassword } from 'src/features/auth/api/register';

// MODELS
import { AuthResponseInterface } from 'src/features/auth/models';

export const useAuth = () => {
	const navigate = useNavigate();

	const storage = {
		clearAccessToken: () => localStorage.removeItem('accessToken'),
		clearRefreshToken: () => localStorage.removeItem('refreshToken'),
		getAccessToken: () => localStorage.getItem('accessToken'),
		getRefreshToken: () => localStorage.getItem('refreshToken'),
		setAccessToken: (accessToken: string) => localStorage.setItem('accessToken', accessToken),
		setRefreshToken: (refreshToken: string) => localStorage.setItem('refreshToken', refreshToken),
	};

	const handleUserResponse = async (data: AuthResponseInterface) => {
		const { accessToken, refreshToken } = data;
		storage.setAccessToken(accessToken);
		storage.setRefreshToken(refreshToken);
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
		storage.clearAccessToken();
		storage.clearRefreshToken();
		navigate({ to: '/auth/register' });
	};

	const checkIsAuthenticated = () => {
		const token = storage.getAccessToken();

		return Boolean(token);
	};

	return { register, logout, checkIsAuthenticated };
};
