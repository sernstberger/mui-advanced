import { Box, Typography, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import type { ThemeFormData } from '../../types/theme';

interface ColorInputProps {
  name: string;
  label: string;
}

const ColorInput = ({ name, label }: ColorInputProps) => {
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
        <Box>
          <Typography variant="body2" gutterBottom>
            {label}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <input
              type="color"
              value={field.value}
              onChange={field.onChange}
              style={{
                width: 40,
                height: 40,
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
              aria-label={label}
            />
            <TextField
              size="small"
              value={field.value}
              onChange={field.onChange}
              error={!!error}
              helperText={error?.message}
              inputProps={{
                pattern: '^#[0-9A-Fa-f]{6}$',
                placeholder: '#1976d2',
                'aria-label': `${label} hex value`,
              }}
              sx={{ width: 100 }}
            />
          </Box>
        </Box>
      )}
    />
  );
};

export default ColorInput;
