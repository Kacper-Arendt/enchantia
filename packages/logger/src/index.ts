export const logger = {
	error: (place: string, message: any) => {
		// eslint-disable-next-line no-console
		console.error(place, message);
	},
	log: (place: string, message: any) => {
		// eslint-disable-next-line no-console
		console.log(place, message);
	},
};
