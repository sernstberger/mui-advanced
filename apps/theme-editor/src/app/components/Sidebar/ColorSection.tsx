import { Paper, Typography, Stack } from '@mui/material';
import { ColorInput } from '../inputs';
import ModeToggle from './ModeToggle';
import ResetButton from './ResetButton';

const ColorSection = () => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Palette
      </Typography>
      <Stack spacing={2}>
        <ColorInput name="palette.primary.main" label="Primary Color" />
        <ColorInput name="palette.secondary.main" label="Secondary Color" />
        <ColorInput name="palette.error.main" label="Error Color" />
        <ColorInput name="palette.warning.main" label="Warning Color" />
        <ColorInput name="palette.info.main" label="Info Color" />
        <ColorInput name="palette.success.main" label="Success Color" />
        <ModeToggle />
        <ResetButton />
      </Stack>
    </Paper>
  );
};

export default ColorSection;
