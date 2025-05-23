import { Box, Typography, Slider } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import type { ThemeFormData } from '../../types/theme';

interface SliderInputProps {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  formatValue?: (value: number) => string;
}

const SliderInput = ({
  name,
  label,
  min,
  max,
  step,
  formatValue = (v) => `${v}px`,
}: SliderInputProps) => {
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">{label}</Typography>
            <Typography variant="body2" color="text.secondary">
              {formatValue(field.value)}
            </Typography>
          </Box>
          <Slider
            {...field}
            min={min}
            max={max}
            step={step}
            valueLabelDisplay="auto"
            valueLabelFormat={formatValue}
          />
          {error && (
            <Typography variant="caption" color="error">
              {error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default SliderInput;
