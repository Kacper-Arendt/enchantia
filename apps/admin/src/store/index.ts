import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { authStore, AuthStoreInterface } from 'src/store/authStore';

export const useAppStore = create<AuthStoreInterface>()((...a) => ({
	...persist(authStore, {
		name: 'authStore',
		partialize: (state) => ({ refreshToken: state.refreshToken, accessToken: state.accessToken }),
		storage: createJSONStorage(() => localStorage),
	})(...a),
}));
