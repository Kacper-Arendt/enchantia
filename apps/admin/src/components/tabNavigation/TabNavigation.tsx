import { useEffect } from 'react';

// MODELS
import { TabNavigationInterface } from 'src/components/tabNavigation/models';

// HOOKS
import { useTabNavigation } from 'src/components/tabNavigation/useTabNavigation';

export const TabNavigation = <T,>({ tabs }: TabNavigationInterface<T>) => {
	const { activeTab, setActiveTab } = useTabNavigation();
	const filteredTabs = tabs?.filter((tab) => !tab?.hide);

	useEffect(() => {
		if (activeTab && filteredTabs.some((el) => el.id !== activeTab)) setActiveTab<T>(filteredTabs[0]?.id);
	}, [activeTab]);

	return (
		<>
			{filteredTabs.map(({ id, title }) => (
				<button key={id as string} type="button" onClick={() => setActiveTab<T>(id)}>
					{title}
				</button>
			))}
		</>
	);
};
