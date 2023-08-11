import axios, { AxiosResponse } from 'axios';

import { envs } from 'src/config/envs';

export const client = axios.create({
	baseURL: envs.apiUrl,
});

client.interceptors.response.use(({ data }: { data: AxiosResponse<unknown, unknown> }) => data);
