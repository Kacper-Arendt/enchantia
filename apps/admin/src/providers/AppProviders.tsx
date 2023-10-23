import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// CONFIG
import { initializeI18n } from 'src/lib/i18nconfig';
import { queryClient } from 'src/lib/react-query';

// COMPONENTS
import { Toasts } from 'src/components/notifications';
import { envs } from 'src/config/envs';

initializeI18n();

export const AppProviders = ({ children }: { children: ReactNode }) => (
	<QueryClientProvider client={queryClient}>
		<Toasts />
		{children}
		{envs.isDev && <ReactQueryDevtools initialIsOpen={false} />}
	</QueryClientProvider>
);
