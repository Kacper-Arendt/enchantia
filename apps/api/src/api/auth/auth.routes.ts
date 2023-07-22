import { Router } from 'express';

// CONTROLLERS
import { login, refreshToken, register, revokeRefreshTokens } from 'src/api/auth/auth.controllers';

export const authRouter = Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/refreshToken', refreshToken);

authRouter.post('/revokeRefreshTokens', revokeRefreshTokens);
