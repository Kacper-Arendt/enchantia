// ROUTES
import { Routes } from 'src/routes';

// COMPONENTS
import { AppProviders } from 'src/providers/AppProviders';

// STYLES
import 'src/App.module.scss';

const App = () => (
	<AppProviders>
		<Routes />
	</AppProviders>
);

export default App;
