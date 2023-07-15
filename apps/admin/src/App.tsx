// COMPONENTS
import { Button } from 'ui';

// STYLES
import styles from 'src/App.module.css';

const App = () => (
	<div className={styles.app}>
		<h1 className="title">
			<span>Kitchen Sink</span>
			<Button onClick={() => console.log('app', 'click')}>Hello</Button>
		</h1>
	</div>
);

export default App;
