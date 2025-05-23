import { Box, createTheme, ThemeProvider } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Sidebar from './Sidebar';
import Preview from './Preview';
import {
  ThemeFormData,
  ThemeFormSchema,
  defaultThemeValues,
} from '../types/theme';

// Stable theme for the editor interface - this won't change
const editorTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
  },
});

function ThemeEditor() {
  const methods = useForm<ThemeFormData>({
    resolver: zodResolver(ThemeFormSchema),
    defaultValues: defaultThemeValues,
    mode: 'onChange',
  });

  return (
    <ThemeProvider theme={editorTheme}>
      <FormProvider {...methods}>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <Preview />
        </Box>
      </FormProvider>
    </ThemeProvider>
  );
}

export default ThemeEditor;
