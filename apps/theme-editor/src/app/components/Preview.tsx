import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Alert,
  Switch,
  Chip,
  Card,
  CardContent,
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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button variant="contained">Contained Button</Button>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField label="Text Field" variant="outlined" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Alert severity="info">Info Alert</Alert>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Switch defaultChecked />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Chip label="Chip Example" color="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Card Title</Typography>
              <Typography variant="body2">Card content goes here.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Preview;
