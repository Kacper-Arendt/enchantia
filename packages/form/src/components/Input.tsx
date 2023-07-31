import { Control, Controller } from 'react-hook-form';
import { useState } from 'react';
import { InputOwnerState } from '@mui/base/Input/Input.types';
import { Input as MuiInput } from '@mui/base';

// COMPONENTS
import { Label } from '../common';
import { Button } from 'ui';

interface InputInterface {
	name: string;
	type: InputOwnerState['type'];
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	autoFocus?: boolean;
	defaultValue?: string;
	control: Control<any> | undefined;
}

export const Input = ({ label, type, placeholder, autoFocus, disabled, name, control }: InputInterface) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
				<>
					<Label label={label} error={error}>
						<div>
							<MuiInput
								name={name}
								required
								ref={ref}
								value={value}
								onChange={onChange}
								onBlur={onBlur}
								error={Boolean(error)}
								type={isVisible ? 'text' : type}
								placeholder={placeholder}
								autoFocus={autoFocus}
								disabled={disabled}
							/>
							{type === 'password' && (
								<Button type="button" onClick={() => setIsVisible(!isVisible)}>
									X
								</Button>
							)}
						</div>
					</Label>
				</>
			)}
		/>
	);
};
