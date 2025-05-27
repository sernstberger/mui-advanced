import { useController } from 'react-hook-form';
import { TextField } from '@mui/material';

interface ColorInputProps {
  name: string;
  label: string;
  value?: string;
}

const ColorInput = ({ name, label, value }: ColorInputProps) => {
  const { field } = useController({ name });

  return (
    <TextField
      label={label}
      type="color"
      {...field}
      value={value}
      slotProps={{
        input: {
          sx: {
            '& .MuiInputBase-input': {
              all: 'unset',
              height: 40,
              width: 48,
              cursor: 'pointer',
            },
          },
        },
      }}
    />
  );
};

export default ColorInput;
