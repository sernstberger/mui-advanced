import {
  Box,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Slider,
  Switch,
  Button,
  Stack,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import {
  updatePrimaryColor,
  updateSecondaryColor,
  updateErrorColor,
  updateWarningColor,
  updateInfoColor,
  updateSuccessColor,
  updateFontFamily,
  updateFontSize,
  updateMode,
  resetToDefaults,
} from '../store/themeSlice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { useState, useEffect } from 'react';
import type { ThemeState } from '../store/themeSlice';
import MuiAlert from '@mui/material/Alert';
import { loadThemeState } from '../store/localStorage';
import { loadFont } from '../utils/loadFont';

const fontFamilies = ['Roboto', 'Inter', 'Arial', 'Helvetica', 'Open Sans'];

const BASE_FONT_SIZE = 14;
const MIN_SCALE = 0.8;
const MAX_SCALE = 1.5;

function generateThemeCode(
  palette: ThemeState['palette'],
  typography: ThemeState['typography']
) {
  return `import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: '${palette.mode}',
    primary: { main: '${palette.primary.main}' },
    secondary: { main: '${palette.secondary.main}' },
    error: { main: '${palette.error.main}' },
    warning: { main: '${palette.warning.main}' },
    info: { main: '${palette.info.main}' },
    success: { main: '${palette.success.main}' },
  },
  typography: {
    fontFamily: '${typography.fontFamily}',
    fontSize: ${typography.fontSize},
  },
});

// Usage instructions:
// 1. Save this file as theme.ts in your project
// 2. Import and use with ThemeProvider:
// import { ThemeProvider } from '@mui/material/styles';
// import { theme } from './theme';
//
// <ThemeProvider theme={theme}>
//   <App />
// </ThemeProvider>
`;
}

function Sidebar() {
  const dispatch = useAppDispatch();
  const palette = useAppSelector((state) => state.theme.palette);
  const typography = useAppSelector((state) => state.theme.typography);
  const [copySuccess, setCopySuccess] = useState(false);
  const themeCode = generateThemeCode(palette, typography);

  // Calculate scale from fontSize
  const scale = typography.fontSize / BASE_FONT_SIZE;

  const handleFontSizeChange = (_: any, value: number | number[]) => {
    const scaleValue = Array.isArray(value) ? value[0] : value;
    dispatch(updateFontSize(Math.round(BASE_FONT_SIZE * scaleValue)));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(themeCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    } catch (e) {
      setCopySuccess(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([themeCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  const [storageError, setStorageError] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  // Check for localStorage error on mount
  useEffect(() => {
    try {
      loadThemeState();
    } catch (e) {
      setStorageError(true);
    }
  }, []);

  // Handle reset with confirmation
  const handleReset = () => {
    dispatch(resetToDefaults());
    setResetMessage(true);
    setTimeout(() => setResetMessage(false), 2000);
  };

  return (
    <Box
      sx={{
        width: 300,
        borderRight: 1,
        borderColor: 'divider',
        p: 2,
        overflow: 'auto',
      }}
    >
      {storageError && (
        <MuiAlert severity="warning" sx={{ mb: 2 }}>
          Theme could not be loaded from localStorage. Using default theme.
        </MuiAlert>
      )}
      {resetMessage && (
        <MuiAlert severity="success" sx={{ mb: 2 }}>
          Theme reset to MUI defaults.
        </MuiAlert>
      )}
      <Typography variant="h6" gutterBottom>
        Theme Editor
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" gutterBottom>
        Palette
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="body2">Light</Typography>
        <Switch
          checked={palette.mode === 'dark'}
          onChange={(_, checked) =>
            dispatch(updateMode(checked ? 'dark' : 'light'))
          }
          inputProps={{ 'aria-label': 'toggle light/dark mode' }}
        />
        <Typography variant="body2">Dark</Typography>
      </Stack>
      <TextField
        label="Primary Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.primary.main}
        onChange={(e) => dispatch(updatePrimaryColor(e.target.value))}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Secondary Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.secondary.main}
        onChange={(e) => dispatch(updateSecondaryColor(e.target.value))}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Error Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.error.main}
        onChange={(e) => dispatch(updateErrorColor(e.target.value))}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Warning Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.warning.main}
        onChange={(e) => dispatch(updateWarningColor(e.target.value))}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Info Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.info.main}
        onChange={(e) => dispatch(updateInfoColor(e.target.value))}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Success Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.success.main}
        onChange={(e) => dispatch(updateSuccessColor(e.target.value))}
        InputLabelProps={{ shrink: true }}
      />
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" gutterBottom>
        Typography
      </Typography>
      <TextField
        select
        label="Font Family"
        fullWidth
        margin="dense"
        value={typography.fontFamily}
        onChange={(e) => {
          loadFont(e.target.value);
          dispatch(updateFontFamily(e.target.value));
        }}
        sx={{ mb: 2 }}
      >
        {fontFamilies.map((family) => (
          <MenuItem key={family} value={family}>
            {family}
          </MenuItem>
        ))}
      </TextField>
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
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" gutterBottom>
        Export Theme
      </Typography>
      <Box
        sx={{
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          p: 1,
          mb: 1,
          fontFamily: 'monospace',
          fontSize: 12,
          maxHeight: 180,
          overflow: 'auto',
          whiteSpace: 'pre',
        }}
        component="pre"
      >
        {themeCode}
      </Box>
      <Stack spacing={1}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
        >
          {copySuccess ? 'Copied!' : 'Copy Theme Code'}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download theme.ts
        </Button>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={handleReset}
        >
          Reset to Defaults
        </Button>
      </Stack>
    </Box>
  );
}

export default Sidebar;
