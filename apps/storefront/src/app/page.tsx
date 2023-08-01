import { logger } from 'logger';

export const metadata = {
	title: 'Store | Kitchen Sink',
};

export default function Store() {
	logger.log('storefron page', 'Hey! This is Home.');
	return (
		<div className='container'>
			<h1 className='title'>
				Store <br />
				<span>Kitchen Sink</span>
			</h1>
		</div>
	);
}
