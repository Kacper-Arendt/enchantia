import { TypeOf, ZodSchema } from 'zod';
import { useForm as useHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormProps as UseHookFormProps } from 'react-hook-form/dist/types/form';

interface UseFormProps<T extends ZodSchema<any>> extends UseHookFormProps<TypeOf<T>> {
	schema: T;
}

export const useForm = <T extends ZodSchema<unknown>>({ schema, ...formConfig }: UseFormProps<T>) =>
	useHookForm({
		...formConfig,
		resolver: zodResolver(schema),
	});
