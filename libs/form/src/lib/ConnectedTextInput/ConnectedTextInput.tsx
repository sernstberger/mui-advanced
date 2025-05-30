import { Controller, ControllerProps } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  InputProps,
} from '@mui/material';
import {
  applyDefaultMessages,
  combineValidationRules,
  commonValidations,
} from '../utils/validation';

export interface ConnectedTextInputProps
  extends Omit<InputProps, 'name' | 'defaultValue'> {
  name: string;
  label: string;
  hideLabel?: boolean;
  helperText?: string;
  required?: boolean;
  rules?: ControllerProps['rules'];
}

export function ConnectedTextInput({
  name,
  label,
  hideLabel = false,
  helperText,
  required = false,
  rules,
  ...props
}: ConnectedTextInputProps) {
  // Apply default messages to user rules
  const rulesWithDefaults = applyDefaultMessages(rules, label, required);

  // Combine built-in validation with user-provided validation
  const combinedRules = combineValidationRules(
    rulesWithDefaults,
    { noWhitespaceOnly: commonValidations.noWhitespaceOnly },
    rules
  );

  return (
    <Controller
      name={name}
      rules={combinedRules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <FormControl error={hasError}>
            {!hideLabel && (
              <InputLabel htmlFor={name} required={required}>
                {label}
              </InputLabel>
            )}
            <Input
              {...field}
              {...props}
              id={name}
              aria-label={hideLabel ? label : undefined}
            />

            {(hasError || helperText) && (
              <FormHelperText>
                {fieldState.error?.message || helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
