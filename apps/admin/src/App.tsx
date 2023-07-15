import { CounterButton, NewTabLink } from 'ui';

const App = () => (
	<div className="container">
		<div />
		<h1 className="title">
			<span>Kitchen Sink</span>
		</h1>
		<CounterButton />
		<p className="description">
			Built With <NewTabLink href="https://turbo.build/repo">Turborepo</NewTabLink> +{' '}
			<NewTabLink href="https://vitejs.dev/">Vite</NewTabLink>
		</p>
	</div>
);

export default App;
