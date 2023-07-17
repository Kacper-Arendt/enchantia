import { ReactNode } from 'react';

// CONFIG
import { initializeI18n } from 'internationalization';

initializeI18n();

export const AppProviders = ({ children }: { children: ReactNode }) => <>{children}</>;
