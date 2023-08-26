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
	db.user.findFirst({
		where: {
			id,
		},
	});
export const findUserByEmail = (email: string) =>
	db.user.findFirst({
		where: {
			email,
		},
	});

export const deleteUserById = (id: string) =>
	db.user.delete({
		where: {
			id,
		},
	});

export const deleteUserByEmail = (email: string) =>
	db.user.delete({
		where: {
			email,
		},
	});
