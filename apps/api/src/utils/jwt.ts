import jwt from 'jsonwebtoken';

// CONFIG
import { envs } from 'src/config';

// MODELS
import { User } from 'database';

export interface AccessTokenPayload {
	userId: User['id'];
}

export const generateAccessToken = (user: User) =>
	jwt.sign({ userId: user.id } satisfies AccessTokenPayload, envs.jwtAccessSecret!, {
		// expiresIn: '5m',
		expiresIn: '32h',
	});

export interface RefreshTokenPayload {
	userId: User['id'];
	jti: string;
}

export const generateRefreshToken = (user: User, jti: string) =>
	jwt.sign({ userId: user.id, jti } satisfies RefreshTokenPayload, envs.jwtRefreshSecret!, {
		expiresIn: '32h',
	});

export const generateTokens = (user: User, jti: string) => {
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user, jti);

	return {
		accessToken,
		refreshToken,
	};
};
