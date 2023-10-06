// MODELS
import { User } from 'database';

export const userDto = (user: User): Omit<User, 'password'> => ({
	id: user.id,
	email: user.email,
	createdAt: user.createdAt,
	updatedAt: user.updatedAt,
	name: user.name,
});
