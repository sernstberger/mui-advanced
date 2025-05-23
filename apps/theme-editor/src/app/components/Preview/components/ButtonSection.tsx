import { Stack, Button } from '@mui/material';

const ButtonSection = () => (
  <Stack spacing={1}>
    <Button variant="contained">Contained Button</Button>
    <Button variant="outlined">Outlined Button</Button>
    <Button variant="text">Text Button</Button>
  </Stack>
);

export default ButtonSection;
