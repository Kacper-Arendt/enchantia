const env = import.meta.env;

export const envs = {
	apiUrl: env.VITE_API_URL,
	isDev: env.MODE === 'development',
};
