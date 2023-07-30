import { Outlet } from '@tanstack/router';

export const PrivateLayout = () => (
	<div>
		<h1>Private</h1>
		<Outlet />
	</div>
);
