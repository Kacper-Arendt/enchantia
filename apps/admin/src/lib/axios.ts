import axios from 'axios';

import { envs } from 'src/config/envs';

export const client = axios.create({
	baseURL: envs.apiUrl,
});

client.interceptors.response.use((response) => response.data);
