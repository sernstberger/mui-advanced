import { Box, TextField, MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import type { ThemeFormData } from '../../types/theme';

const CSS_UNITS = [
  { value: 'rem', label: 'rem' },
  { value: 'em', label: 'em' },
  { value: 'px', label: 'px' },
  { value: '%', label: '%' },
  { value: 'vh', label: 'vh' },
  { value: 'vw', label: 'vw' },
] as const;

interface SizeInputProps {
  name: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  allowUnitless?: boolean; // For line-height which can be unitless
}

function SizeInput({
  name,
  label,
  placeholder,
  helperText,
  size = 'small',
  fullWidth = true,
  allowUnitless = false,
}: SizeInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ThemeFormData>();

  // Get nested error for the field
  const error = name
    .split('.')
    .reduce((acc, key) => (acc ? acc[key] : undefined), errors as any);

  // Parse placeholder for default values
  const parsePlaceholder = (placeholder?: string) => {
    if (!placeholder) return { number: '', unit: 'rem' };
    const match = placeholder.match(/^(-?[\d.]+)(.*)$/);
    if (match) {
      return { number: match[1], unit: match[2] || 'rem' };
    }
    return { number: placeholder, unit: '' };
  };

  const placeholderData = parsePlaceholder(placeholder);

  const unitOptions = allowUnitless
    ? [{ value: '', label: 'unitless' }, ...CSS_UNITS]
    : CSS_UNITS;

  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field }) => {
        // Parse the current value into number and unit
        const parseValue = (value: string | number) => {
          const stringValue = String(value || '');
          if (!stringValue) return { numeric: '', unit: 'rem' };

          const match = stringValue.match(/^(-?[\d.]+)(.*)$/);
          if (match) {
            return { numeric: match[1], unit: match[2] || 'rem' };
          }
          return { numeric: stringValue, unit: '' };
        };

        const { numeric, unit } = parseValue(field.value);

        const handleNumericChange = (newValue: string) => {
          if (newValue === '') {
            field.onChange('');
          } else {
            // For unitless values (like line-height), handle numeric conversion
            if (allowUnitless && unit === '') {
              const numValue = parseFloat(newValue);
              field.onChange(isNaN(numValue) ? newValue : numValue);
            } else {
              field.onChange(`${newValue}${unit}`);
            }
          }
        };

        const handleUnitChange = (newUnit: string) => {
          if (numeric !== '') {
            // For unitless values, allow empty unit and convert to number
            if (allowUnitless && newUnit === '') {
              const numValue = parseFloat(numeric);
              field.onChange(isNaN(numValue) ? numeric : numValue);
            } else {
              field.onChange(`${numeric}${newUnit}`);
            }
          }
        };

        return (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <TextField
              label={label}
              size={size}
              value={numeric}
              onChange={(e) => handleNumericChange(e.target.value)}
              placeholder={placeholderData.number}
              helperText={error?.message || helperText}
              error={!!error}
              sx={{ flex: 2 }}
              type="number"
              inputProps={{
                step: 'any',
              }}
            />
            <TextField
              select
              label="Unit"
              size={size}
              value={unit}
              onChange={(e) => handleUnitChange(e.target.value)}
              sx={{ flex: 1, minWidth: 80 }}
              helperText=" " // Keep space for alignment
            >
              {unitOptions.map((unitOption) => (
                <MenuItem key={unitOption.value} value={unitOption.value}>
                  {unitOption.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        );
      }}
    />
  );
}

export default SizeInput;
