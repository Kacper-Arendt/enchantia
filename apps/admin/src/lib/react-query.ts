import { AxiosError } from 'axios';
import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions } from '@tanstack/react-query';
import { PromiseValue } from 'type-fest';

const queryConfig: DefaultOptions = {
	queries: {
		refetchOnWindowFocus: false,
		retry: false,
		suspense: true,
	},
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: any) => unknown> = PromiseValue<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => unknown> = Omit<
	UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
	'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: unknown[]) => unknown> = UseMutationOptions<
	ExtractFnReturnType<MutationFnType>,
	AxiosError,
	Parameters<MutationFnType>[0]
>;
