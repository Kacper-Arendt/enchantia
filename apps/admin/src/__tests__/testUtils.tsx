import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { AppProviders } from 'src/providers/AppProviders';
import { Routes } from 'src/routes';

interface IExtendedRenderOptions extends RenderOptions {}

const setupComponent = (ui: JSX.Element) => (
	<AppProviders>
		{/*  TODO: FIX tantstack router */}
		{/* @ts-ignore */}
		<Routes>{ui}</Routes>
	</AppProviders>
);

const customRender = (ui: JSX.Element): RenderResult => {
	try {
		const componentTree = setupComponent(ui);
		return render(componentTree);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		throw error;
	}
};

export * from '@testing-library/react';

export type { IExtendedRenderOptions };
export { customRender };
