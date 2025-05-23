import { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { resetToDefaults } from '../../store/themeSlice';
import { initialState } from '../../store/themeSlice';

const ResetButton = () => {
  const { reset } = useFormContext();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    dispatch(resetToDefaults());
    setTimeout(() => {
      reset(initialState);
      setOpen(true);
    }, 0);
  };

  return (
    <>
      <Button variant="text" color="secondary" fullWidth onClick={handleReset}>
        Reset to Defaults
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Theme reset to MUI defaults.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResetButton;
