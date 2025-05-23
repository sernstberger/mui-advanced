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
          primary: {
            light: watchedValues.palette.primary?.light || '#1976d2',
            main: watchedValues.palette.primary?.main || '#1976d2',
            dark: watchedValues.palette.primary?.dark || '#1976d2',
            contrastText:
              watchedValues.palette.primary?.contrastText || '#FFFFFF',
          },
          secondary: {
            light: watchedValues.palette.secondary?.light || '#dc004e',
            main: watchedValues.palette.secondary?.main || '#dc004e',
            dark: watchedValues.palette.secondary?.dark || '#dc004e',
            contrastText:
              watchedValues.palette.secondary?.contrastText || '#FFFFFF',
          },
          error: {
            light: watchedValues.palette.error?.light || '#f44336',
            main: watchedValues.palette.error?.main || '#f44336',
            dark: watchedValues.palette.error?.dark || '#f44336',
            contrastText:
              watchedValues.palette.error?.contrastText || '#FFFFFF',
          },
          warning: {
            light: watchedValues.palette.warning?.light || '#ff9800',
            main: watchedValues.palette.warning?.main || '#ff9800',
            dark: watchedValues.palette.warning?.dark || '#ff9800',
            contrastText:
              watchedValues.palette.warning?.contrastText || '#000000',
          },
          info: {
            light: watchedValues.palette.info?.light || '#2196f3',
            main: watchedValues.palette.info?.main || '#2196f3',
            dark: watchedValues.palette.info?.dark || '#2196f3',
            contrastText: watchedValues.palette.info?.contrastText || '#FFFFFF',
          },
          success: {
            light: watchedValues.palette.success?.light || '#4caf50',
            main: watchedValues.palette.success?.main || '#4caf50',
            dark: watchedValues.palette.success?.dark || '#4caf50',
            contrastText:
              watchedValues.palette.success?.contrastText || '#FFFFFF',
          },
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
