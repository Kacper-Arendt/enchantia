// UTILS
import { db, hashToken } from 'src/utils';

export const addRefreshTokenToWhitelist = ({ jti, refreshToken, userId }: any) =>
	db.refreshToken.create({
		data: {
			id: jti,
			hashedToken: hashToken(refreshToken),
			userId,
		},
	});

// used to check if the token sent by the client is in the database.
export const findRefreshTokenById = (id: string) =>
	db.refreshToken.findUnique({
		where: {
			id,
		},
	});

// soft delete tokens after usage.
export const deleteRefreshToken = (id: string) =>
	db.refreshToken.update({
		where: {
			id,
		},
		data: {
			revoked: true,
		},
	});

export const revokeTokens = (userId: string) =>
	db.refreshToken.updateMany({
		where: {
			userId,
		},
		data: {
			revoked: true,
		},
	});
