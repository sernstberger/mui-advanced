import { Stack, Typography, Switch } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { ThemeFormData } from '../../types/theme';

const ModeToggle = () => {
  const { watch, setValue } = useFormContext<ThemeFormData>();
  const mode = watch('palette.mode');

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="body2">Light</Typography>
      <Switch
        checked={mode === 'dark'}
        onChange={(_, checked) =>
          setValue('palette.mode', checked ? 'dark' : 'light', {
            shouldValidate: true,
          })
        }
        inputProps={{ 'aria-label': 'toggle light/dark mode' }}
      />
      <Typography variant="body2">Dark</Typography>
    </Stack>
  );
};

export default ModeToggle;
