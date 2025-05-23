import { Box, Typography } from '@mui/material';

function Preview() {
  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        overflow: 'auto',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Theme Preview
      </Typography>
      <Typography variant="body1">
        Component preview grid will go here
      </Typography>
    </Box>
  );
}

export default Preview;
