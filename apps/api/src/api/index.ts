import { Router } from 'express';

// ROUTES
import { authRouter } from 'src/api/auth/auth.routes';
import { userRouter } from 'src/api/users/user.routes';

export const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
