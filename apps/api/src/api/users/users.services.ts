import bcrypt from 'bcrypt';

// UTILS
import { db } from 'src/utils';

export const createUserByEmailAndPassword = (user: any) => {
	user.password = bcrypt.hashSync(user.password, 12);
	return db.user.create({
		data: user,
	});
};

export const findUserById = (id: string) =>
	db.user.findUnique({
		where: {
			id,
		},
	});
export const findUserByEmail = (email: string) =>
	db.user.findUnique({
		where: {
			email,
		},
	});
