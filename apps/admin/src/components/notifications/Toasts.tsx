import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toasts = () => (
	<ToastContainer
		position="bottom-right"
		autoClose={3000}
		hideProgressBar={false}
		newestOnTop
		closeOnClick
		pauseOnFocusLoss
		draggable
		pauseOnHover
		theme="dark"
	/>
);
