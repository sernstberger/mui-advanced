import { Controller, ControllerProps } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  InputProps,
} from '@mui/material';

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
  // Built-in validation to prevent whitespace-only input
  const builtInValidation = (value: string) => {
    if (value && !value.trim()) {
      return 'Cannot be empty or whitespace only';
    }
    return true;
  };

  // Combine built-in validation with user-provided validation
  const combinedRules = {
    ...rules,
    validate: {
      // Built-in trim validation
      noWhitespaceOnly: builtInValidation,
      // User-provided validation (if any)
      ...(typeof rules?.validate === 'function'
        ? { custom: rules.validate }
        : typeof rules?.validate === 'object'
        ? rules.validate
        : {}),
    },
  };

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
