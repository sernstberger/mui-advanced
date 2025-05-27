import { Stack, Typography, Switch } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { ThemeFormData } from '../../../types/theme';

export default function ThemeModeToggle() {
  const { control } = useFormContext<ThemeFormData>();

  return (
    <Controller
      name="palette.mode"
      control={control}
      render={({ field }) => (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Typography variant="body2">Light</Typography>
          <Switch
            checked={field.value === 'dark'}
            onChange={(_, checked) =>
              field.onChange(checked ? 'dark' : 'light')
            }
            inputProps={{ 'aria-label': 'toggle light/dark mode' }}
          />
          <Typography variant="body2">Dark</Typography>
        </Stack>
      )}
    />
  );
}
