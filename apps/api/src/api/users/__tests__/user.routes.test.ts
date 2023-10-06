import { getMockReq, getMockRes } from '@jest-mock/express';
import { v4 as uuidv4 } from 'uuid';

// MODELS
import { AuthSuccessInterfaces } from 'src/api/auth/auth.controllers';

// UTILS
import { RegisterUserMock, testUser } from 'src/__testUtils__/helpers';

// CONTROLLERS
import { deleteAccount, getProfile } from 'src/api/users/user.controller';

// SERVICES
import { deleteUserById } from 'src/api/users/users.services';

describe('Get profile', () => {
	it('should return 404 when there is no user id', async () => {
		const req = getMockReq({ payload: {} });
		const { res, next } = getMockRes();
		await getProfile(req, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ message: 'User id required' });
	});

	it('should return 404 when there is wrong user id', async () => {
		const req = getMockReq({ payload: { userId: '123' } });
		const { res, next } = getMockRes();
		await getProfile(req, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
	});

	// todo consider how to create and delete required user during database migration and deletion
	xit('should return user profile', async () => {
		const req = getMockReq({ payload: { userId: testUser.id } });
		const { res, next } = getMockRes();
		await getProfile(req, res, next);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({
				id: expect.anything(),
				email: expect.anything(),
				name: expect.anything(),
				createdAt: expect.anything(),
				updatedAt: expect.anything(),
			}),
		);
	});
});

describe('Delete account', () => {
	let user: AuthSuccessInterfaces;

	beforeAll(async () => {
		user = await RegisterUserMock({
			name: 'JohnDoe',
			password: 'testPassword',
			email: `test${Math.random()}@enchantia.com`,
		});
	});

	afterAll(async () => {
		await deleteUserById(user.id);
	});

	it('should return 404 when there is no userId', async () => {
		const req = getMockReq({ payload: { userId: '123' } });
		const { res, next } = getMockRes();

		await deleteAccount(req, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
	});

	it('should return 404 when there is no password', async () => {
		const req = getMockReq({ payload: { userId: user?.id } });
		const { res, next } = getMockRes();

		await deleteAccount(req, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ message: 'Password required' });
	});

	it('should return 404 when there is wrong password', async () => {
		const req = getMockReq({ payload: { userId: user?.id }, body: { password: 'password' } });
		const { res, next } = getMockRes();

		await deleteAccount(req, res, next);

		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({ message: 'Invalid password' });
	});

	it('should return 200 when user is successfully deleted', async () => {
		const userData = { email: `${uuidv4()}@enchantia.com`, password: uuidv4(), name: 'john' };
		const userToDelete = await RegisterUserMock(userData);

		const req = getMockReq({ payload: { userId: userToDelete?.id }, body: { password: userData.password } });
		const { res, next } = getMockRes();

		await deleteAccount(req, res, next);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ message: 'Successfully deleted' });
	});
});
