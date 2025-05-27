import { Box, Typography, Divider } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import PaletteSection from './sections/PaletteSection';
import TypographySection from './sections/TypographySection';
import ComponentOverridesSection from './sections/ComponentOverridesSection';
import ExportSection from './sections/ExportSection';
import { useThemeExport } from './hooks/useThemeExport';
import { useFontLoader } from './hooks/useFontLoader';

function Sidebar() {
  const { resetMessage } = useThemeExport();

  // Load fonts when typography changes
  useFontLoader();

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

      <PaletteSection />
      <Divider sx={{ my: 2 }} />

      <TypographySection />
      <Divider sx={{ my: 2 }} />

      <ComponentOverridesSection />
      <Divider sx={{ my: 2 }} />

      <ExportSection />
    </Box>
  );
}

export default Sidebar;
