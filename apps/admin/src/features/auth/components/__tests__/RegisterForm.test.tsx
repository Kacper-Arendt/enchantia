import { describe, vitest, it, expect } from 'vitest';
import { screen, customRender } from 'src/__tests__/testUtils';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { RegisterForm } from 'src/features/auth/components';

describe('should register new user', () => {
	const onFinish = vitest.fn();

	customRender(<RegisterForm onFinish={onFinish} />);

	it('renders fields correctly', () => {
		const name = screen.getByRole('textbox', { name: /name/i });
		expect(name).toBeInTheDocument();
		expect(name).toHaveAttribute('type', 'text');

		const email = screen.getByRole('textbox', { name: /email/i });
		expect(email).toBeInTheDocument();
		expect(email).toHaveAttribute('type', 'email');

		const password = screen.getByLabelText(/password/i);
		expect(password).toBeInTheDocument();
		expect(password).toHaveAttribute('type', 'password');
	});

	it('should register new user and call onFinish', async () => {
		await userEvent.type(screen.getByRole('textbox', { name: /name/i }), 'test');
		await userEvent.type(screen.getByRole('textbox', { name: /email/i }), `testq${Math.random()}@test.com`);
		await userEvent.type(screen.getByLabelText(/password/i), 'test123');
		await userEvent.click(screen.getByRole('button', { name: /Submit/i }));

		await waitFor(() => expect(onFinish).toHaveBeenCalledTimes(1));
	});
});
