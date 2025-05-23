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
  const light = `palette.${name}.light`;
  const main = `palette.${name}.main`;
  const dark = `palette.${name}.dark`;
  const contrastText = `palette.${name}.contrastText`;
  const { field: mainField } = useController({ name: main });
  const { field: lightField } = useController({
    name: `palette.${name}.light`,
  });
  const { field: darkField } = useController({ name: dark });
  const { field: contrastTextField } = useController({ name: contrastText });
  console.log('!!!', name, mainField, lightField, darkField, contrastTextField);
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

          <TextField label="light" type="color" {...lightField} />

          <Box
            sx={{
              backgroundColor: mainField.value,
            }}
          >
            <Typography>main</Typography>
          </Box>

          <TextField label="dark" type="color" {...darkField} />

          <TextField label="contrastText" type="color" {...contrastTextField} />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default ColorItem;
