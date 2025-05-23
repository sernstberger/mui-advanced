import { Box, Typography, Divider } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import useThemeForm from '../../hooks/useThemeForm';
import ColorSection from './ColorSection';
import TypographySection from './TypographySection';
import ExportSection from './ExportSection';

const Sidebar = () => {
  const form = useThemeForm();

  return (
    <FormProvider {...form}>
      <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider', p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Theme Editor
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <ColorSection />
        <TypographySection />
        <ExportSection />
      </Box>
    </FormProvider>
  );
};

export default Sidebar;
