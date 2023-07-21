import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// UTILS
import { generateTokens, hashToken, RefreshTokenPayload } from 'src/utils';

// SERVICES
import { addRefreshTokenToWhitelist, deleteRefreshToken, findRefreshTokenById, revokeTokens } from 'src/api/auth/auth.services';
import { findUserByEmail, createUserByEmailAndPassword, findUserById } from 'src/api/users/users.services';

// CONFIG
import { envs } from 'src/config';

export const authRouter = Router();

authRouter.post('/register', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'You must provide an email and a password.' });

		if (password.length < 5) return res.status(400).json({ message: 'Password must be at least 6 characters' });

		const existingUser = await findUserByEmail(email);

		if (existingUser) return res.status(400).json({ message: 'Email already in use.' });

		const user = await createUserByEmailAndPassword({ email, password });
		const jti = uuidv4();
		const { accessToken, refreshToken } = generateTokens(user, jti);
		await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

		res.json({
			accessToken,
			refreshToken,
		});
	} catch (err) {
		next(err);
	}
});

authRouter.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) return res.status(400).json({ message: 'You must provide an email and a password.' });

		const existingUser = await findUserByEmail(email);

		if (!existingUser) return res.status(400).json({ message: 'Invalid login credentials.' });

		const validPassword = await bcrypt.compare(password, existingUser.password);

		if (!validPassword) return res.status(403).json({ message: 'Invalid login credentials.' });

		const jti = uuidv4();
		const { accessToken, refreshToken } = generateTokens(existingUser, jti);
		await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

		res.json({
			accessToken,
			refreshToken,
		});
	} catch (err) {
		next(err);
	}
});

authRouter.post('/refreshToken', async (req, res, next) => {
	try {
		const { refreshToken } = req.body;

		if (!refreshToken) return res.status(400).json({ message: 'Missing refresh token.' });

		const payload = jwt.verify(refreshToken, envs.jwtRefreshSecret!) as RefreshTokenPayload;
		const savedRefreshToken = await findRefreshTokenById(payload.jti);

		if (!savedRefreshToken || savedRefreshToken.revoked === true) return res.status(401).json({ message: 'Unauthorized' });

		const hashedToken = hashToken(refreshToken);
		if (hashedToken !== savedRefreshToken.hashedToken) return res.status(401).json({ message: 'Unauthorized' });

		const user = await findUserById(payload!.userId);
		if (!user) return res.status(401).json({ message: 'Unauthorized' });

		await deleteRefreshToken(savedRefreshToken.id);
		const jti = uuidv4();
		const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
		await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

		res.json({
			accessToken,
			refreshToken: newRefreshToken,
		});
	} catch (err) {
		next(err);
	}
});

authRouter.post('/revokeRefreshTokens', async (req, res, next) => {
	try {
		const { userId } = req.body;
		await revokeTokens(userId);
		res.status(200).json({ message: `Tokens revoked for user with id #${userId}` });
	} catch (err) {
		next(err);
	}
});
