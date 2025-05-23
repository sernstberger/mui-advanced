import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Alert,
  Chip,
  Card,
  CardContent,
  Stack,
} from '@mui/material';

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
      <Grid container spacing={3}>
        {/* Buttons */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack spacing={1}>
            <Button variant="contained">Contained Button</Button>
            <Button variant="outlined">Outlined Button</Button>
            <Button variant="text">Text Button</Button>
          </Stack>
        </Grid>
        {/* TextFields */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack spacing={1}>
            <TextField label="Outlined" variant="outlined" fullWidth />
            <TextField label="Filled" variant="filled" fullWidth />
          </Stack>
        </Grid>
        {/* Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Card Title</Typography>
              <Typography variant="body2">Card content goes here.</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Typography Samples */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack spacing={0.5}>
            <Typography variant="h1">h1 Heading</Typography>
            <Typography variant="h2">h2 Heading</Typography>
            <Typography variant="h3">h3 Heading</Typography>
            <Typography variant="h4">h4 Heading</Typography>
            <Typography variant="h5">h5 Heading</Typography>
            <Typography variant="h6">h6 Heading</Typography>
            <Typography variant="body1">Body1 text</Typography>
            <Typography variant="body2">Body2 text</Typography>
            <Typography variant="button">Button text</Typography>
            <Typography variant="caption">Caption text</Typography>
            <Typography variant="overline">Overline text</Typography>
          </Stack>
        </Grid>
        {/* Chip */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Chip label="Chip Example" color="primary" />
        </Grid>
        {/* Alerts */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack spacing={1}>
            <Alert severity="error">Error Alert</Alert>
            <Alert severity="warning">Warning Alert</Alert>
            <Alert severity="info">Info Alert</Alert>
            <Alert severity="success">Success Alert</Alert>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Preview;
