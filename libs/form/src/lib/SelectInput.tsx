import {
  FormControl,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';

interface SelectInputProps<T extends string> {
  name: string;
  label: string;
  options: readonly T[];
  placeholder?: string;
  helperText?: string;
}

export const SelectInput = <T extends string>({
  name,
  label,
  options,
  placeholder,
  helperText,
}: SelectInputProps<T>) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth size="small" error={!!error}>
          <Typography variant="body2" gutterBottom>
            {label}
          </Typography>
          <Select {...field} label={label}>
            {placeholder && (
              <MenuItem value="">
                <em>{placeholder}</em>
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {(error || helperText) && (
            <FormHelperText>{error?.message || helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
