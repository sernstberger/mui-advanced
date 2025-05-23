import {
  FormControl,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import type { ThemeFormData } from '../../types/theme';

interface SelectInputProps<T extends string> {
  name: string;
  label: string;
  options: readonly T[];
}

const SelectInput = <T extends string>({
  name,
  label,
  options,
}: SelectInputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ThemeFormData>();
  const error = name
    .split('.')
    .reduce((acc, key) => (acc ? acc[key] : undefined), errors as any);

  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth size="small" error={!!error}>
          <Typography variant="body2" gutterBottom>
            {label}
          </Typography>
          <Select {...field} label={label}>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default SelectInput;
