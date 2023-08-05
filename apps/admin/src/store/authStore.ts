import { StateCreator } from 'zustand';

export interface AuthStoreInterface {
	accessToken: string | null;
	addAccessToken: (token: string) => void;
	clearAccessToken: () => void;

	refreshToken: string | null;
	addRefreshToken: (token: string) => void;
	clearRefreshToken: () => void;
}

export const authStore: StateCreator<AuthStoreInterface> = (set) => ({
	accessToken: null,
	addAccessToken: (accessToken) => set(() => ({ accessToken })),
	clearAccessToken: () => set(() => ({ accessToken: null })),

	refreshToken: null,
	addRefreshToken: (refreshToken) => set(() => ({ refreshToken })),
	clearRefreshToken: () => set(() => ({ refreshToken: null })),
});
