import { Paper, Typography, Stack } from '@mui/material';
import { SelectInput, SliderInput } from '../inputs';
import {
  FONT_FAMILIES,
  BASE_FONT_SIZE,
  MIN_SCALE,
  MAX_SCALE,
} from '../../types/theme';

const TypographySection = () => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Typography
      </Typography>
      <Stack spacing={2}>
        <SelectInput
          name="typography.fontFamily"
          label="Font Family"
          options={FONT_FAMILIES}
        />
        <SliderInput
          name="typography.fontSize"
          label="Font Size"
          min={Math.round(BASE_FONT_SIZE * MIN_SCALE)}
          max={Math.round(BASE_FONT_SIZE * MAX_SCALE)}
          step={1}
          formatValue={(v) => `${v}px`}
        />
      </Stack>
    </Paper>
  );
};

export default TypographySection;
