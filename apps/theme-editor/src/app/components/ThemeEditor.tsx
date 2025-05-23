import { Box, createTheme, ThemeProvider } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import Sidebar from './Sidebar';
import Preview from './Preview';
import { usePersistedForm } from '../hooks/usePersistedForm';

// Stable theme for the editor interface - this won't change
const editorTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        margin: 'dense',
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
});

function ThemeEditor() {
  const methods = usePersistedForm();

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
