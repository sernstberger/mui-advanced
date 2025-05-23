import { Stack, TextField } from '@mui/material';

const TextFieldSection = () => (
  <Stack spacing={1}>
    <TextField label="Outlined" variant="outlined" fullWidth />
    <TextField label="Filled" variant="filled" fullWidth />
  </Stack>
);

export default TextFieldSection;
