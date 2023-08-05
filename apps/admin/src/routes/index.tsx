import { RouterProvider, Router, Route, RootRoute } from '@tanstack/router';

// COMPONENTS
import { PrivateLayout } from 'src/components/layouts';
import { Register } from 'src/features/auth';
import { Dashboard } from 'src/features/misc';

const rootRoute = new RootRoute();

// ====================
// --> START Auth Routes <--
// ====================
const authRoutes = new Route({ getParentRoute: () => rootRoute, path: '/auth' });

const RegisterRoute = new Route({ getParentRoute: () => authRoutes, path: 'register', component: Register });

// --> END Auth Routes <--

// ====================
// --> START Private Routes <--
// ====================

const privateRoutes = new Route({ getParentRoute: () => rootRoute, path: '/', component: PrivateLayout });
const DashboardRoute = new Route({ getParentRoute: () => privateRoutes, path: '/dashboard', component: Dashboard });

// --> END Private Routes  <--

const routeTree = rootRoute.addChildren([authRoutes.addChildren([RegisterRoute]), privateRoutes.addChildren([DashboardRoute])]);

const router = new Router({ routeTree });

export const Routes = () => <RouterProvider router={router} />;

declare module '@tanstack/router' {
	interface Register {
		router: typeof router;
	}
}
