import { useNavigate, useParams } from '@tanstack/react-router';

export const useTabNavigation = () => {
	const navigate = useNavigate({ from: '/' });
	const params = useParams<any>({ from: '/*' });

	const setActiveTab = <T>(tab: T) => {
		navigate({ search: () => ({ tab }) });
	};

	return { setActiveTab, activeTab: params?.tab };
};
