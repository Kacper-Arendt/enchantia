import { rest } from 'msw';
import { envs } from 'src/config/envs';

export const authHandlers = [rest.post(`${envs.apiUrl}/auth/register`, () => {})];
