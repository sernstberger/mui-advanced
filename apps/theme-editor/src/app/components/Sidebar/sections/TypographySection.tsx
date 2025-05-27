import { Typography, TextField, MenuItem, Slider } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import {
  ThemeFormData,
  FONT_FAMILIES,
  BASE_FONT_SIZE,
  MIN_SCALE,
  MAX_SCALE,
  TYPOGRAPHY_VARIANTS,
} from '../../../types/theme';
import SectionHeader from '../components/SectionHeader';
import TypographyVariantEditor from '../TypographyVariantEditor';

export default function TypographySection() {
  const { control, watch, setValue } = useFormContext<ThemeFormData>();
  const watchedValues = watch();

  // Calculate scale from fontSize
  const scale = watchedValues.typography?.fontSize
    ? watchedValues.typography.fontSize / BASE_FONT_SIZE
    : 1;

  const handleFontSizeChange = (_: any, value: number | number[]) => {
    const scaleValue = Array.isArray(value) ? value[0] : value;
    setValue('typography.fontSize', Math.round(BASE_FONT_SIZE * scaleValue));
  };

  return (
    <>
      <SectionHeader title="Typography" />

      <Controller
        name="typography.fontFamily"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Font Family"
            fullWidth
            margin="dense"
            value={field.value}
            onChange={field.onChange}
            sx={{ mb: 2 }}
          >
            {FONT_FAMILIES.map((family) => (
              <MenuItem key={family} value={family}>
                {family}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Typography gutterBottom>Font Size Scale</Typography>
      <Slider
        min={MIN_SCALE}
        max={MAX_SCALE}
        step={0.01}
        value={scale}
        onChange={handleFontSizeChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `${(v * 100).toFixed(0)}%`}
      />

      <Typography variant="body2" sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
        Typography Variants
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Customize individual typography variants like headings, body text, etc.
      </Typography>

      {TYPOGRAPHY_VARIANTS.map((variant) => (
        <TypographyVariantEditor key={variant} variant={variant} />
      ))}
    </>
  );
}
