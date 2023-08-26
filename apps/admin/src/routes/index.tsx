/* eslint-disable @typescript-eslint/no-throw-literal */

import { RouterProvider, Router, Route, RootRoute, redirect } from '@tanstack/router';

// STORE
import { useAppStore } from 'src/store';

// COMPONENTS
import { Login, Register } from 'src/features/auth';
import { Dashboard } from 'src/features/misc';
import { PrivateLayout } from 'src/components/layouts';

const rootRoute = new RootRoute();

const nonMatchingRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	beforeLoad: async () => {
		throw redirect({
			to: '/',
		});
	},
});

// ====================
// --> START Auth Routes <--
// ====================
const authRoutes = new Route({
	getParentRoute: () => rootRoute,
	path: '/auth',
	beforeLoad: async () => {
		const { accessToken } = useAppStore.getState();
		if (accessToken)
			throw redirect({
				to: '/',
			});
	},
});

const RegisterRoute = new Route({
	getParentRoute: () => authRoutes,
	path: 'register',
	component: () => <Register navigateOnSuccess />,
});

const LoginRoute = new Route({
	getParentRoute: () => authRoutes,
	path: 'login',
	component: () => <Login navigateOnSuccess />,
});

// --> END Auth Routes <--

// ====================
// --> START Private Routes <--
// ====================

const privateRoutes = new Route({
	getParentRoute: () => rootRoute,
	id: 'private',
	component: () => {
		const { accessToken } = useAppStore.getState();
		if (!accessToken) return <Login navigateOnSuccess={false} />;
		return <PrivateLayout />;
	},
});
const DashboardRoute = new Route({ getParentRoute: () => privateRoutes, path: '/', component: Dashboard });

// --> END Private Routes  <--

const routeTree = rootRoute.addChildren([
	authRoutes.addChildren([RegisterRoute, LoginRoute]),
	privateRoutes.addChildren([DashboardRoute]),
	nonMatchingRoute,
]);

export const router = new Router({ routeTree });

export const Routes = () => <RouterProvider router={router} />;

declare module '@tanstack/router' {
	interface Register {
		router: typeof router;
	}
}
