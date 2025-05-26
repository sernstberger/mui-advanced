import { Box, TextField, MenuItem, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';

const CSS_UNITS = [
  { value: 'rem', label: 'rem' },
  { value: 'em', label: 'em' },
  { value: 'px', label: 'px' },
  { value: '%', label: '%' },
  { value: 'vh', label: 'vh' },
  { value: 'vw', label: 'vw' },
] as const;

interface SizeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  allowUnitless?: boolean; // For line-height which can be unitless
}

function SizeInput({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  size = 'small',
  fullWidth = true,
  allowUnitless = false,
}: SizeInputProps) {
  const [numericValue, setNumericValue] = useState<string>('');
  const [unit, setUnit] = useState<string>('rem');

  // Parse the incoming value into number and unit
  useEffect(() => {
    if (value) {
      const match = value.match(/^(-?[\d.]+)(.*)$/);
      if (match) {
        setNumericValue(match[1]);
        setUnit(match[2] || 'rem');
      }
    } else {
      setNumericValue('');
      setUnit('rem');
    }
  }, [value]);

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

  const handleNumericChange = (newValue: string) => {
    setNumericValue(newValue);
    if (newValue === '') {
      onChange('');
    } else {
      // For unitless values (like line-height), don't add unit if it's just a number
      if (allowUnitless && !isNaN(parseFloat(newValue)) && unit === '') {
        onChange(newValue);
      } else {
        onChange(`${newValue}${unit}`);
      }
    }
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    if (numericValue !== '') {
      // For unitless values, allow empty unit
      if (allowUnitless && newUnit === '') {
        onChange(numericValue);
      } else {
        onChange(`${numericValue}${newUnit}`);
      }
    }
  };

  const unitOptions = allowUnitless
    ? [{ value: '', label: 'unitless' }, ...CSS_UNITS]
    : CSS_UNITS;

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
      <TextField
        label={label}
        size={size}
        value={numericValue}
        onChange={(e) => handleNumericChange(e.target.value)}
        placeholder={placeholderData.number}
        helperText={helperText}
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
}

export default SizeInput;
