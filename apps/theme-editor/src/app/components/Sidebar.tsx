import {
  Box,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Slider,
} from '@mui/material';

const fontFamilies = [
  'Roboto',
  'Arial',
  'Helvetica',
  'Georgia',
  'Times New Roman',
  'Courier New',
];

// Placeholder handler to avoid linter errors
const noop = () => {};

function Sidebar() {
  // Placeholder handlers and state (to be connected to Redux in next step)
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
      {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map(
        (color) => (
          <TextField
            key={color}
            label={`${color.charAt(0).toUpperCase() + color.slice(1)} Color`}
            type="color"
            fullWidth
            margin="dense"
            sx={{ mb: 1 }}
            value={''}
            onChange={noop}
          />
        )
      )}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" gutterBottom>
        Typography
      </Typography>
      <TextField
        select
        label="Font Family"
        fullWidth
        margin="dense"
        value={''}
        onChange={noop}
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
        value={14}
        onChange={noop}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}

export default Sidebar;
