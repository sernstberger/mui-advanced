import { Box } from '@mui/material';
import Sidebar from './Sidebar/Sidebar';
import Preview from './Preview';

function ThemeEditor() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Preview />
    </Box>
  );
}

export default ThemeEditor;
