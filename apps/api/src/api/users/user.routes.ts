import express from 'express';

// MIDDLEWARES
import { isAuthenticated } from 'src/middlewares';

// SERVICES
import { findUserById } from 'src/api/users/users.services';
import { userDto } from 'src/api/users/user.dto';

export const userRouter = express.Router();

userRouter.get('/profile', isAuthenticated, async (req, res, next) => {
	try {
		const { userId } = req.payload;
		const user = await findUserById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		return res.status(200).json(userDto(user));
	} catch (err) {
		next(err);
	}
});
