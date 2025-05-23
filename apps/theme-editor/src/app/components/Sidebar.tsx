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

const fontFamilies = ['Roboto', 'Inter', 'Arial', 'Helvetica', 'Open Sans'];

const BASE_FONT_SIZE = 14;
const MIN_SCALE = 0.8;
const MAX_SCALE = 1.5;

function Sidebar() {
  const dispatch = useAppDispatch();
  const palette = useAppSelector((state) => state.theme.palette);
  const typography = useAppSelector((state) => state.theme.typography);

  // Calculate scale from fontSize
  const scale = typography.fontSize / BASE_FONT_SIZE;

  // Handle font size slider change
  const handleFontSizeChange = (_: any, value: number | number[]) => {
    const scaleValue = Array.isArray(value) ? value[0] : value;
    dispatch(updateFontSize(Math.round(BASE_FONT_SIZE * scaleValue)));
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
      <Stack spacing={1}>
        <Button variant="contained" color="primary" fullWidth disabled>
          Copy Theme Code
        </Button>
        <Button variant="outlined" color="primary" fullWidth disabled>
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
