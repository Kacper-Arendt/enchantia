import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

// SERVICES
import { deleteUserById, findUserById } from 'src/api/users/users.services';
import { deleteUsersRefreshTokens } from 'src/api/auth/auth.services';

// DTOS
import { userDto } from 'src/api/users/user.dto';

// HELPERS
import { logger } from 'src/utils';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req?.payload ?? {};

		if (!userId) return res.status(404).json({ message: 'User id required' });
		const user = await findUserById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		return res.status(200).json(userDto(user));
	} catch (err) {
		logger.error('profile', err);
		next(err);
	}
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req?.payload ?? {};
		const { password } = req?.body ?? {};

		const user = await findUserById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		if (!password) return res.status(404).json({ message: 'Password required' });
		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) return res.status(403).json({ message: 'Invalid password' });
		await deleteUsersRefreshTokens(user);
		await deleteUserById(userId);

		return res.status(200).json({ message: 'Successfully deleted' });
	} catch (err) {
		logger.error('deleteAccount', err);
		next(err);
	}
};
