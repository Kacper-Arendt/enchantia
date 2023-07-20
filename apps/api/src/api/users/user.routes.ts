import bcrypt from 'bcrypt';
import express from 'express';

// MIDDLEWARES
import { isAuthenticated } from 'src/middlewares';

// SERVICES
import { deleteUserById, findUserById } from 'src/api/users/users.services';
import { deleteUsersRefreshTokens } from 'src/api/auth/auth.services';

// DTOS
import { userDto } from 'src/api/users/user.dto';

// HELPERS
import { logger } from 'logger';

export const userRouter = express.Router();

userRouter.get('/profile', isAuthenticated, async (req, res, next) => {
	try {
		const { userId } = req.payload;
		const user = await findUserById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		return res.status(200).json(userDto(user));
	} catch (err) {
		logger.error('profile', err);
		next(err);
	}
});

userRouter.delete('/deleteAccount', isAuthenticated, async (req, res, next) => {
	try {
		const { userId } = req.payload;
		const { password } = req.body;

		const user = await findUserById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) return res.status(403).json({ message: 'Invalid login credentials' });
		await deleteUsersRefreshTokens(user);
		await deleteUserById(userId);

		return res.status(200).json({ message: 'Successfully deleted' });
	} catch (err) {
		logger.error('deleteAccount', err);
		next(err);
	}
});
