import { Stack, Alert } from '@mui/material';

const AlertSection = () => (
  <Stack spacing={1}>
    <Alert severity="error">Error Alert</Alert>
    <Alert severity="warning">Warning Alert</Alert>
    <Alert severity="info">Info Alert</Alert>
    <Alert severity="success">Success Alert</Alert>
  </Stack>
);

export default AlertSection;
