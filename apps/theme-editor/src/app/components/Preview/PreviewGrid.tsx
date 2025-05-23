import { Grid, Box, Typography } from '@mui/material';
import ButtonSection from './components/ButtonSection';
import TextFieldSection from './components/TextFieldSection';
import CardSection from './components/CardSection';
import TypographySection from './components/TypographySection';
import ChipSection from './components/ChipSection';
import AlertSection from './components/AlertSection';
import PaletteSection from './components/PaletteSection';

const PreviewGrid = () => {
  return (
    <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Theme Preview
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <PaletteSection />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ButtonSection />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldSection />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardSection />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TypographySection />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChipSection />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <AlertSection />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreviewGrid;
