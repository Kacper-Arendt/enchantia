// LIBS
import { client } from 'src/lib/axios';

// MODELS
import { AuthResponseInterface } from 'src/features/auth/models';

export type LoginCredentialsInterface = {
	email: string;
	password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsInterface): Promise<AuthResponseInterface> =>
	client.post('/auth/login', data, { headers: { contentType: 'application/json' } });
