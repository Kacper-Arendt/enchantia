import { describe, vitest, it, expect } from 'vitest';
import { screen, customRender } from 'src/__tests__/testUtils';

import { LoginForm } from 'src/features/auth/components';

describe('should login user', () => {
	const onFinish = vitest.fn();

	beforeEach(() => {
		customRender(<LoginForm onFinish={onFinish} />);
	});

	it('renders fields correctly', () => {
		const email = screen.getByRole('textbox', { name: /email/i });
		expect(email).toBeInTheDocument();
		expect(email).toHaveAttribute('type', 'email');

		const password = screen.getByLabelText(/password/i);
		expect(password).toBeInTheDocument();
		expect(password).toHaveAttribute('type', 'password');
	});
});
