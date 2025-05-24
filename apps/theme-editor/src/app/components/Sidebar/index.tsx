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
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
import { loadFont } from '../../utils/loadFont';
import {
  ThemeFormData,
  FONT_FAMILIES,
  BASE_FONT_SIZE,
  MIN_SCALE,
  MAX_SCALE,
  defaultThemeValues,
  ComponentOverride,
} from '../../types/theme';
import ColorInput from '../inputs/ColorInput';
import ColorItem from './ColorItem';
import ComponentOverrideDialog from './ComponentOverrideDialog';
import ComponentOverrideItem from './ComponentOverrideItem';

function generateThemeCode(data: ThemeFormData) {
  // Generate components overrides
  const componentsCode =
    data.components && data.components.length > 0
      ? `  components: {
${data.components
  .map((override) => {
    const parts: string[] = [];

    if (override.defaultProps) {
      parts.push(
        `      defaultProps: ${JSON.stringify(override.defaultProps, null, 8)}`
      );
    }

    if (override.styleOverrides) {
      const styleStr = JSON.stringify(override.styleOverrides, null, 8)
        .split('\n')
        .map((line) => '      ' + line)
        .join('\n');
      parts.push(`      styleOverrides: ${styleStr}`);
    }

    return `    Mui${override.component}: {
${parts.join(',\n')}
    }`;
  })
  .join(',\n')}
  },`
      : '';

  return `import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: '${data.palette.mode}',
    primary: { main: '${data.palette.primary.main}' },
    secondary: { main: '${data.palette.secondary.main}' },
    error: { main: '${data.palette.error.main}' },
    warning: { main: '${data.palette.warning.main}' },
    info: { main: '${data.palette.info.main}' },
    success: { main: '${data.palette.success.main}' },
  },
  typography: {
    fontFamily: '${data.typography.fontFamily}',
    fontSize: ${data.typography.fontSize},
  },${componentsCode ? '\n' + componentsCode : ''}
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
  const { control, watch, setValue, reset } = useFormContext<ThemeFormData>();
  const [copySuccess, setCopySuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);
  const [overrideDialogOpen, setOverrideDialogOpen] = useState(false);
  const [editingOverride, setEditingOverride] =
    useState<ComponentOverride | null>(null);

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'components',
  });

  const watchedValues = watch();
  const themeCode = generateThemeCode(watchedValues);

  // Calculate scale from fontSize
  const scale = watchedValues.typography?.fontSize
    ? watchedValues.typography.fontSize / BASE_FONT_SIZE
    : 1;

  const handleFontSizeChange = (_: any, value: number | number[]) => {
    const scaleValue = Array.isArray(value) ? value[0] : value;
    setValue('typography.fontSize', Math.round(BASE_FONT_SIZE * scaleValue));
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

  const handleReset = () => {
    reset(defaultThemeValues);
    setResetMessage(true);
    setTimeout(() => setResetMessage(false), 2000);
  };

  const handleOpenOverrideDialog = () => {
    setEditingOverride(null);
    setOverrideDialogOpen(true);
  };

  const handleEditOverride = (override: ComponentOverride) => {
    setEditingOverride(override);
    setOverrideDialogOpen(true);
  };

  const handleSaveOverride = (override: ComponentOverride) => {
    if (editingOverride) {
      const index = fields.findIndex((field) => field.id === override.id);
      if (index !== -1) {
        update(index, override);
      }
    } else {
      append(override);
    }
  };

  const handleDeleteOverride = (id: string) => {
    const index = fields.findIndex((field) => field.id === id);
    if (index !== -1) {
      remove(index);
    }
  };

  // Load font when font family changes
  useEffect(() => {
    if (watchedValues.typography?.fontFamily) {
      loadFont(watchedValues.typography.fontFamily);
    }
  }, [watchedValues.typography?.fontFamily]);

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

      {/* <ColorInput name="palette.primary.main" label="Primary Color" /> */}
      <ColorItem name="primary" label="Primary Color" />

      <ColorItem name="secondary" label="Secondary Color" />

      <ColorItem name="error" label="Error Color" />

      <ColorItem name="warning" label="Warning Color" />

      <ColorItem name="info" label="Info Color" />

      <ColorItem name="success" label="Success Color" />

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" gutterBottom>
        Typography
      </Typography>

      <Controller
        name="typography.fontFamily"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Font Family"
            fullWidth
            margin="dense"
            value={field.value}
            onChange={field.onChange}
            sx={{ mb: 2 }}
          >
            {FONT_FAMILIES.map((family) => (
              <MenuItem key={family} value={family}>
                {family}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

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

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <SettingsIcon sx={{ mr: 1 }} />
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          Component Overrides
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleOpenOverrideDialog}
        >
          Add Override
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Customize default props and styles for specific MUI components. These
        settings will apply globally to all instances of the selected
        components.
      </Typography>

      {fields.length === 0 ? (
        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            p: 3,
            textAlign: 'center',
            bgcolor: 'background.default',
          }}
        >
          <SettingsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            No component overrides yet. Add your first override to customize
            component defaults.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
          {fields.map((field, index) => (
            <ComponentOverrideItem
              key={field.id}
              override={field}
              onEdit={handleEditOverride}
              onDelete={handleDeleteOverride}
            />
          ))}
        </Box>
      )}

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

      <ComponentOverrideDialog
        open={overrideDialogOpen}
        onClose={() => setOverrideDialogOpen(false)}
        onSave={handleSaveOverride}
        editingOverride={editingOverride}
      />
    </Box>
  );
}

export default Sidebar;
