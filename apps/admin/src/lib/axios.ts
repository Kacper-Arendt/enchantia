import axios from 'axios';

// MODELS
import { AuthResponseInterface } from 'src/features/auth/models';

// STORE
import { useAppStore } from 'src/store';

// UTILS
import { envs } from 'src/config/envs';
import { router } from 'src/routes';

export const client = axios.create({
	baseURL: envs.apiUrl,
});

client.defaults.headers.common['Content-Type'] = 'application/json';

client.interceptors.request.use((config) => {
	const withCredentials = config?.withCredentials ?? true;
	if (withCredentials) {
		const { accessToken } = useAppStore.getState();
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

let failedQueue: any[] = [];
let isRefreshing = false;

const processQueue = (error: any) => {
	failedQueue.forEach((prom) => {
		if (error) prom.reject(error);
		else prom.resolve();
	});

	failedQueue = [];
};

client.interceptors.response.use((response) => response.data);

client.interceptors.response.use(
	(response) => response,
	(error: any) => {
		const originalRequest = error.config;
		const { refreshToken, clearRefreshToken, clearAccessToken, addRefreshToken, addAccessToken } = useAppStore.getState();

		const handleError = (err: any) => {
			processQueue(err);
			clearRefreshToken();
			clearAccessToken();
			router.history.push('/auth/login');
			return Promise.reject(err);
		};

		if (
			refreshToken &&
			error?.response?.status === 401 &&
			error?.response.data.message === 'TokenExpiredError' &&
			// eslint-disable-next-line no-underscore-dangle
			originalRequest?._retry !== true
		) {
			if (isRefreshing)
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(() => client(originalRequest))
					.catch((err) => Promise.reject(err));

			isRefreshing = true;
			// eslint-disable-next-line no-underscore-dangle
			originalRequest._retry = true;
			return client
				.post<AuthResponseInterface>(`${envs.apiUrl}/auth/refreshToken`, {
					refreshToken,
				})
				.then((res: any) => {
					addRefreshToken(res.refreshToken);
					addAccessToken(res.accessToken);

					processQueue(null);

					return client(originalRequest);
				}, handleError)
				.finally(() => {
					isRefreshing = false;
				});
		}

		// Refresh token missing or expired => logout user...
		if (error.response?.status === 401 && error.response?.data?.message === 'TokenExpiredError') return handleError(error);
		return Promise.reject(error);
	},
);
