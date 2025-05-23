import { useController } from 'react-hook-form';

import { TextField } from '@mui/material';

interface ColorInputProps {
  name: string;
  label: string;
}

const ColorInput = ({ name, label }: ColorInputProps) => {
  const { field } = useController({ name });
  return (
    <TextField
      label={label}
      type="color"
      fullWidth
      margin="dense"
      sx={{ mb: 1 }}
      {...field}
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default ColorInput;
