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
  return (
    <Controller
      name={name}
      rules={rules}
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

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {hasError && (
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
