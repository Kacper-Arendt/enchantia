import { RouterProvider, Router, Route, RootRoute, redirect, Link } from '@tanstack/react-router';

// STORE
import { useAppStore } from 'src/store';

// COMPONENTS
import { Login, Register } from 'src/features/auth';
import { Dashboard } from 'src/features/misc';
import { PrivateLayout } from 'src/components/layouts';
import { StoriesList } from 'src/features/stories';

const rootRoute = new RootRoute({});

const nonMatchingRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: () => (
		<div>
			Route does not exists
			<Link to="/" search={{}} params={{}}>
				Home
			</Link>
		</div>
	),
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
	component: () => <PrivateLayout />,
	beforeLoad: async () => {
		const { accessToken } = useAppStore.getState();
		if (!accessToken)
			throw redirect({
				to: '/auth/login',
				search: {
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					redirect: router.state.location.href,
				},
			});
	},
});
const DashboardRoute = new Route({ getParentRoute: () => privateRoutes, path: '/', component: Dashboard });

const StoriesListRoute = new Route({ getParentRoute: () => privateRoutes, path: '/stories', component: StoriesList });

// --> END Private Routes  <--

const routeTree = rootRoute.addChildren([
	authRoutes.addChildren([RegisterRoute, LoginRoute]),
	privateRoutes.addChildren([DashboardRoute, StoriesListRoute]),
	nonMatchingRoute,
]);

export const router = new Router({ routeTree });

export const Routes = () => <RouterProvider router={router} />;

export const routes: { path: keyof (typeof router)['routesByPath']; title: string }[] = [
	{ path: '/', title: 'dashboard' },
	{ path: '/stories', title: 'storiesList' },
];

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
