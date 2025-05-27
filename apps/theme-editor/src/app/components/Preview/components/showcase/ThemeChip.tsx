import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ThemeChip() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="MUI" color="primary" size="small" />
      <Chip label="React" color="warning" size="small" />
      <Chip label="CSS" color="success" size="small" />
      <Chip label="TypeScript" color="error" size="small" />
      <Chip label="JavaScript" size="small" />
    </Stack>
  );
}
