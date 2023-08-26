import { z } from 'zod';
import { useTranslation } from 'react-i18next';

// HOOKS
import { useAuth } from 'src/features/auth/hooks/useAuth';

// COMPONENTS
import { Button } from 'src/ui';
import { Form, Input, useForm } from 'src/components/form';
import { AuthLink } from 'src/features/auth/components/AuthLink';

// STYLES
import styles from 'src/features/auth/components/styles.module.css';

const signUpFormSchema = z.object({
	name: z.string().min(3).max(20),
	email: z.string().email(),
	password: z.string().min(6).max(126),
});

export const RegisterForm = ({ onFinish }: { onFinish?: () => void }) => {
	const { t } = useTranslation();
	const form = useForm({
		schema: signUpFormSchema,
		defaultValues: { name: '', email: '', password: '' },
	});
	const { register } = useAuth();

	return (
		<div className={styles.registerFormWrapper}>
			<h1 className={styles.formHeading}>{t('routes.register')}</h1>
			<Form form={form} onSubmit={(item) => register(item, onFinish)} className={styles.registerForm}>
				<Input name="name" type="text" control={form.control} label={t('general.name')} />
				<Input name="email" type="email" control={form.control} label={t('general.email')} />
				<Input name="password" type="password" control={form.control} label={t('general.password')} />
				<Button type="submit" loading={false}>
					{t('general.submit')}
				</Button>
			</Form>

			<AuthLink to="/auth/login" text={t('general.alreadyRegistered')} />
		</div>
	);
};
