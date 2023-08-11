import { ReactNode } from 'react';

// CONFIG
import { initializeI18n } from 'src/lib/i18nconfig';

// COMPONENTS
import { Toasts } from 'src/components/notifications';

initializeI18n();

export const AppProviders = ({ children }: { children: ReactNode }) => (
	<>
		<Toasts />
		{children}
	</>
);
