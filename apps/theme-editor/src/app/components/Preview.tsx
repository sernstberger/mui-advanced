import PreviewGrid from './Preview/PreviewGrid';
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import { ThemeFormData } from '../types/theme';
import { Box } from '@mui/material';

function Preview() {
  const { control } = useFormContext<ThemeFormData>();
  const watchedValues = useWatch({ control });
  const [previewTheme, setPreviewTheme] = useState<Theme>(createTheme());

  // Update preview theme when form values change
  useEffect(() => {
    if (watchedValues?.palette && watchedValues?.typography) {
      const newTheme = createTheme({
        palette: {
          mode: watchedValues.palette.mode,
          primary: { main: watchedValues.palette.primary?.main || '#1976d2' },
          secondary: {
            main: watchedValues.palette.secondary?.main || '#dc004e',
          },
          error: { main: watchedValues.palette.error?.main || '#f44336' },
          warning: { main: watchedValues.palette.warning?.main || '#ff9800' },
          info: { main: watchedValues.palette.info?.main || '#2196f3' },
          success: { main: watchedValues.palette.success?.main || '#4caf50' },
        },
        typography: {
          fontFamily: watchedValues.typography.fontFamily || 'Roboto',
          fontSize: watchedValues.typography.fontSize || 14,
        },
      });
      setPreviewTheme(newTheme);
    }
  }, [watchedValues]);

  return (
    <Box sx={{ flex: 1, overflow: 'auto' }}>
      <ThemeProvider theme={previewTheme}>
        <CssBaseline />
        <PreviewGrid />
      </ThemeProvider>
    </Box>
  );
}

export default Preview;
