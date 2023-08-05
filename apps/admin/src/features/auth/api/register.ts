// LIBS
import { client } from 'src/lib/axios';

// MODELS
import { AuthResponseInterface } from 'src/features/auth/models';

export type RegisterCredentialsInterface = {
	name: string;
	email: string;
	password: string;
};

export const registerWithEmailAndPassword = (data: RegisterCredentialsInterface): Promise<AuthResponseInterface> =>
	client.post('/auth/register', data, { headers: { contentType: 'application/json' } });
