import { Controller, ControllerProps } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  InputProps,
} from '@mui/material';

export interface ConnectedTextInputProps
  extends Omit<InputProps, 'name' | 'defaultValue'>,
    ControllerProps {
  name: string;
  label: string;
}

export function ConnectedTextInput({
  name,
  label,
  rules,
  ...props
}: ConnectedTextInputProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <FormControl>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Input {...field} {...props} />
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
      rules={rules}
    />
  );
}
