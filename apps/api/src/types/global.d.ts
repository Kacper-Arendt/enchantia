/* eslint-disable */

import { RefreshTokenPayload } from 'src/utils';

declare global {
	namespace Express {
		interface Request {
			payload: RefreshTokenPayload;
		}
	}
}

export {};
