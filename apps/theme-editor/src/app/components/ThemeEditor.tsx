import { alpha, Box, createTheme, ThemeProvider } from '@mui/material';
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
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          'label + &': {
            marginTop: theme.spacing(3),
          },
          '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: '#F3F6F9',
            border: '1px solid',
            borderColor: '#E0E3E7',
            fontSize: 16,
            padding: '10px 12px',
            transition: theme.transitions.create([
              'border-color',
              'background-color',
              'box-shadow',
            ]),
            '&:focus': {
              boxShadow: `${alpha(
                theme.palette.primary.main,
                0.25
              )} 0 0 0 0.2rem`,
              borderColor: theme.palette.primary.main,
            },
            ...theme.applyStyles('dark', {
              backgroundColor: '#1A2027',
              borderColor: '#2D3843',
            }),
          },
        }),
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: 'standard',
        fullWidth: true,
        margin: 'dense',
        size: 'small',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
    },
    // MuiSelect: {
    //   defaultProps: {
    //     variant: 'standard',
    //     fullWidth: true,
    //     margin: 'dense',
    //     size: 'small',
    //   },
    // },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        fullWidth: true,
        margin: 'dense',
        size: 'small',
        InputLabelProps: {
          shrink: true,
        },
        InputProps: {
          disableUnderline: true,
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
