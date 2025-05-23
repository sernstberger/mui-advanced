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
import { ColorInput } from '../inputs';

interface ColorInputProps {
  name: string;
  label: string;
}

const ColorItem = ({ name, label }: ColorInputProps) => {
  const [openAdvancedDialog, setOpenAdvancedDialog] = useState(false);
  // const light = `palette.${name}.light`;
  const main = `palette.${name}.main`;
  // const dark = `palette.${name}.dark`;
  // const contrastText = `palette.${name}.contrastText`;
  const { field: mainField } = useController({ name: main });
  // const { field: lightField } = useController({ name: light });
  // const { field: darkField } = useController({ name: dark });
  // const { field: contrastTextField } = useController({ name: contrastText });
  console.log('!!!', name, mainField.value);
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <ColorInput label={label} {...mainField} />
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

          <ColorInput label="light" name={`palette.${name}.light`} />

          <Box
            sx={{
              backgroundColor: (theme) => theme.palette[name].main,
            }}
          >
            <Typography>main</Typography>
          </Box>

          <ColorInput label="dark" name={`palette.${name}.dark`} />

          <ColorInput
            label="contrastText"
            name={`palette.${name}.contrastText`}
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default ColorItem;
