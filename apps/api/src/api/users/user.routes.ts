import express from 'express';

// MIDDLEWARES
import { isAuthenticated } from 'src/middlewares';

// CONTROLLERS
import { deleteAccount, getProfile } from 'src/api/users/user.controller';

export const userRouter = express.Router();

userRouter.get('/profile', isAuthenticated, getProfile);

userRouter.delete('/deleteAccount', isAuthenticated, deleteAccount);
