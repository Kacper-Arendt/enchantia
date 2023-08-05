import { ReactNode } from 'react';

// CONFIG
import { initializeI18n } from 'internationalization';

// COMPONENTS
import { Toasts } from 'src/components/notifications';

initializeI18n();

export const AppProviders = ({ children }: { children: ReactNode }) => (
	<>
		<Toasts />
		{children}
	</>
);
