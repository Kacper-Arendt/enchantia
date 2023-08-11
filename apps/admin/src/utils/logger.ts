import { envs } from 'src/config/envs';

export const logger = {
	error: (place: string, message: unknown) => {
		// eslint-disable-next-line no-console
		if (envs.isDev) console.error(place, message);
	},
	log: (place: string, message: unknown) => {
		// eslint-disable-next-line no-console
		if (envs.isDev) console.log(place, message);
	},
};
