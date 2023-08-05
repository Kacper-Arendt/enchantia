import dotenv from 'dotenv';

dotenv.config();

export const envs: Record<string, string> = {
	port: process.env.PORT!,
	jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
	jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
};
