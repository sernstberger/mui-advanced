import { useController } from 'react-hook-form';

import {
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  TextField,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { useState } from 'react';

interface ColorInputProps {
  name: string;
  label: string;
}

const ColorInput = ({ name, label }: ColorInputProps) => {
  const [openAdvancedDialog, setOpenAdvancedDialog] = useState(false);
  const light = `palette.${name}.light`;
  const main = `palette.${name}.main`;
  const dark = `palette.${name}.dark`;
  const contrastText = `palette.${name}.contrastText`;
  const { field: mainField } = useController({ name: main });
  const { field: lightField } = useController({ name: light });
  const { field: darkField } = useController({ name: dark });
  const { field: contrastTextField } = useController({ name: contrastText });
  console.log('!!!', name, mainField.value);
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        label={label}
        type="color"
        {...mainField}
        value={mainField.value}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdvancedDialog(true)}
      >
        Adv
      </Button>
      <Dialog
        open={openAdvancedDialog}
        onClose={() => setOpenAdvancedDialog(false)}
      >
        <DialogTitle>Advanced Color Picker</DialogTitle>
        <DialogContent>
          <TextField
            label={label}
            type="color"
            {...mainField}
            // value={mainField.value}
          />

          <Box
            sx={{
              backgroundColor: (theme) => {
                console.log('!!!???', theme.palette[name].light);
                return theme.palette[name].light;
              },
            }}
          >
            <TextField label="light" type="color" {...lightField} />
          </Box>
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette[name].main,
            }}
          >
            <Typography>main</Typography>
          </Box>
          <Box sx={{ backgroundColor: (theme) => theme.palette[name].dark }}>
            <TextField label="dark" type="color" {...darkField} />
          </Box>
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette[name as any].contrastText,
            }}
          >
            <TextField
              label="contrastText"
              type="color"
              {...contrastTextField}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default ColorInput;
