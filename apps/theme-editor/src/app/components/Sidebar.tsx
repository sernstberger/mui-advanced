import { Box, Typography } from '@mui/material';

function Sidebar() {
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
      <Typography variant="body2" color="text.secondary">
        Color and typography controls will go here
      </Typography>
    </Box>
  );
}

export default Sidebar;
