import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { ComponentProps } from 'react';

interface FormProps<T extends FieldValues = never> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({ form, onSubmit, children, ...props }: FormProps<T>) => (
	<FormProvider {...form}>
		{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
		<form onSubmit={form.handleSubmit(onSubmit)} {...props} noValidate>
			{children}
		</form>
	</FormProvider>
);
