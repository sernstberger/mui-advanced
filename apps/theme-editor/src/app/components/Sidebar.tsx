import {
  Box,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Slider,
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
} from '../store/themeSlice';

const fontFamilies = [
  'Roboto',
  'Arial',
  'Helvetica',
  'Georgia',
  'Times New Roman',
  'Courier New',
];

function Sidebar() {
  const dispatch = useAppDispatch();
  const palette = useAppSelector((state) => state.theme.palette);
  const typography = useAppSelector((state) => state.theme.typography);

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
      <TextField
        label="Primary Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.primary.main}
        onChange={(e) => dispatch(updatePrimaryColor(e.target.value))}
      />
      <TextField
        label="Secondary Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.secondary.main}
        onChange={(e) => dispatch(updateSecondaryColor(e.target.value))}
      />
      <TextField
        label="Error Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.error.main}
        onChange={(e) => dispatch(updateErrorColor(e.target.value))}
      />
      <TextField
        label="Warning Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.warning.main}
        onChange={(e) => dispatch(updateWarningColor(e.target.value))}
      />
      <TextField
        label="Info Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.info.main}
        onChange={(e) => dispatch(updateInfoColor(e.target.value))}
      />
      <TextField
        label="Success Color"
        type="color"
        fullWidth
        margin="dense"
        sx={{ mb: 1 }}
        value={palette.success.main}
        onChange={(e) => dispatch(updateSuccessColor(e.target.value))}
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
      <Typography gutterBottom>Font Size</Typography>
      <Slider
        min={10}
        max={32}
        step={1}
        value={typography.fontSize}
        onChange={(_, value) => dispatch(updateFontSize(Number(value)))}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}

export default Sidebar;
