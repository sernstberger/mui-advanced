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
import { useState, useRef } from 'react';
import type { ThemeState } from '../store/themeSlice';

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

  // Color validation state
  const [colorErrors, setColorErrors] = useState({
    primary: false,
    secondary: false,
    error: false,
    warning: false,
    info: false,
    success: false,
  });
  // Store previous valid colors
  const prevColors = useRef({
    primary: palette.primary.main,
    secondary: palette.secondary.main,
    error: palette.error.main,
    warning: palette.warning.main,
    info: palette.info.main,
    success: palette.success.main,
  });

  // Validate hex color (accepts #RGB, #RRGGBB, #RGBA, #RRGGBBAA)
  const isValidHex = (value: string) =>
    /^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value);

  // Generalized color change handler
  const handleColorChange =
    (key: keyof typeof colorErrors, action: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (isValidHex(value)) {
        setColorErrors((err) => ({ ...err, [key]: false }));
        prevColors.current[key] = value;
        action(value);
      } else {
        setColorErrors((err) => ({ ...err, [key]: true }));
        // Revert to previous valid color
        action(prevColors.current[key]);
      }
    };

  // Handle font size slider change
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
        onChange={handleColorChange('primary', updatePrimaryColor)}
        InputLabelProps={{ shrink: true }}
        error={colorErrors.primary}
        helperText={colorErrors.primary ? 'Invalid hex color' : ''}
      />
      <TextField
        label="Secondary Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.secondary.main}
        onChange={handleColorChange('secondary', updateSecondaryColor)}
        InputLabelProps={{ shrink: true }}
        error={colorErrors.secondary}
        helperText={colorErrors.secondary ? 'Invalid hex color' : ''}
      />
      <TextField
        label="Error Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.error.main}
        onChange={handleColorChange('error', updateErrorColor)}
        InputLabelProps={{ shrink: true }}
        error={colorErrors.error}
        helperText={colorErrors.error ? 'Invalid hex color' : ''}
      />
      <TextField
        label="Warning Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.warning.main}
        onChange={handleColorChange('warning', updateWarningColor)}
        InputLabelProps={{ shrink: true }}
        error={colorErrors.warning}
        helperText={colorErrors.warning ? 'Invalid hex color' : ''}
      />
      <TextField
        label="Info Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.info.main}
        onChange={handleColorChange('info', updateInfoColor)}
        InputLabelProps={{ shrink: true }}
        error={colorErrors.info}
        helperText={colorErrors.info ? 'Invalid hex color' : ''}
      />
      <TextField
        label="Success Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.success.main}
        onChange={handleColorChange('success', updateSuccessColor)}
        InputLabelProps={{ shrink: true }}
        error={colorErrors.success}
        helperText={colorErrors.success ? 'Invalid hex color' : ''}
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
        onChange={(e) => dispatch(updateFontFamily(e.target.value))}
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
          onClick={() => dispatch(resetToDefaults())}
        >
          Reset to Defaults
        </Button>
      </Stack>
    </Box>
  );
}

export default Sidebar;
