import { ComponentProps } from 'react';

import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface FormProps<T extends FieldValues = any> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({ form, onSubmit, children, ...props }: FormProps<T>) => (
	<FormProvider {...form}>
		<form noValidate onSubmit={form.handleSubmit(onSubmit)} {...props}>
			{children}
		</form>
	</FormProvider>
);
