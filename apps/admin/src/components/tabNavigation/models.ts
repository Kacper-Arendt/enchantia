export interface TabNavigationInterface<T> {
	tabs: { id: T; title: string; hide?: boolean }[];
}