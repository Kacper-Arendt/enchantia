import { Router } from 'express';

import { authRouter } from 'src/api/auth/auth.routes';

export const router = Router();

router.use('/auth', authRouter);
