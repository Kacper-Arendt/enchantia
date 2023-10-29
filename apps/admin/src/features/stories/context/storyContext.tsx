import { createContext, ReactNode, useContext } from 'react';
import { useUserStory } from '../api/getStory';
// REDUX

// HOOKS

// MODELS

// COMPONENTS

// STYLES

// UTILS

const useStoryContext = (id: string) => {
	const { data } = useUserStory({ id });

	return { data };
};

export const ContextData = createContext({} as ReturnType<typeof useStoryContext>);
export const useStoryData = () => useContext(ContextData);

export const ContextProvider = ({ children, id }: { children: ReactNode; id: string }) => (
	<ContextData.Provider value={useStoryContext(id)}>{children}</ContextData.Provider>
);
