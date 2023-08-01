import { z } from 'zod';
import { useTranslation } from 'react-i18next';

// HOOKS

// COMPONENTS
import { Button } from 'ui';
import { Form, Input, useForm } from 'form';

// STYLES
import styles from 'src/features/auth/components/styles.module.css';

const signUpFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(126),
});

export const RegisterForm = () => {
	const { t } = useTranslation();
	const form = useForm({
		schema: signUpFormSchema,
		defaultValues: { email: '', password: '' },
	});

	return (
		<div className={styles.registerFormWrapper}>
			<h1>{t('routes.register')}</h1>
			<Form form={form} onSubmit={(item) => console.log(item)} className={styles.registerForm}>
				<Input name="email" type="email" control={form.control} />
				<Input name="password" type="password" control={form.control} />
				<Button type="submit" loading={false}>
					{t('general.submit')}
				</Button>
			</Form>
		</div>
	);
};
