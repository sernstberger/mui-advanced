import { Grid, Box, BoxProps, Typography, Divider } from '@mui/material';
import ButtonSection from './components/ButtonSection';
import TextFieldSection from './components/TextFieldSection';
import CardSection from './components/CardSection';
import TypographySection from './components/TypographySection';
import AlertSection from './components/AlertSection';
import PaletteSection from './components/PaletteSection';

import { useTheme } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import TaskCard from './components/showcase/TaskCard';
import ThemeChip from './components/showcase/ThemeChip';
// import ThemeDatePicker from './components/showcase/ThemeDatePicker';
import NotificationCard from './components/showcase/NotificationCard';
import ThemeAccordion from './components/showcase/ThemeAccordion';
import ThemeSlider from './components/showcase/ThemeSlider';
import ThemeToggleButton from './components/showcase/ThemeToggleButton';
import ThemeTabs from './components/showcase/ThemeTabs';
import PlayerCard from './components/showcase/PlayerCard';
import ThemeDatePicker from './components/showcase/ThemeDatePicker';
import ThemeTimeline from './components/showcase/ThemeTimeline';
import FolderTable from './components/showcase/FolderTable';

export function Hero() {
  const globalTheme = useTheme();
  const isMdUp = useMediaQuery(globalTheme.breakpoints.up('md'));
  return (
    <Stack direction="row" spacing={3}>
      {isMdUp && (
        <Stack
          spacing={3}
          useFlexGap
          sx={{ '& > .MuiPaper-root': { maxWidth: 'none' } }}
        >
          <TaskCard />
          <ThemeChip />
          <ThemeDatePicker />
          <NotificationCard />
          <ThemeAccordion />
        </Stack>
      )}
      {isMdUp && (
        <Stack
          spacing={3}
          useFlexGap
          sx={{ ml: 3, '& > .MuiPaper-root': { maxWidth: 'none' } }}
        >
          <ThemeTimeline />
          <ThemeToggleButton />
          <ThemeSlider />
          <ThemeTabs />
          <PlayerCard />
          <FolderTable />
        </Stack>
      )}
    </Stack>
  );
}

const PreviewGrid = () => {
  return (
    <div>
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Typography variant="h3" gutterBottom>
          Theme Preview
        </Typography>
        <Hero />
        <Typography variant="h4" gutterBottom>
          Inputs
        </Typography>
        <ul>
          <li>Autocomplete</li>

          <li>Button</li>

          <li>Button Group</li>

          <li>Checkbox</li>

          <li>Floating Action Button</li>

          <li>Radio Group</li>

          <li>Rating</li>

          <li>Select</li>

          <li>Slider</li>

          <li>Switch</li>

          <li>Text Field</li>

          <li>Transfer List</li>

          <li>Toggle Button</li>
        </ul>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" gutterBottom>
          Data display
        </Typography>

        <ul>
          <li>Avatar</li>

          <li>Badge</li>

          <li>Chip</li>
          <li>Divider</li>

          <li>Icons</li>

          <li>List</li>

          <li>Table</li>

          <li>Tooltip</li>

          <li>Typography</li>
        </ul>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" gutterBottom>
          Feedback
        </Typography>

        <ul>
          <li>Alert</li>

          <li>Backdrop</li>

          <li>Dialog</li>

          <li>Progress</li>

          <li>Skeleton</li>

          <li>Snackbar</li>
        </ul>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" gutterBottom>
          Surface
        </Typography>

        <ul>
          <li>Accordion</li>

          <li>App Bar</li>

          <li>Card</li>

          <li>Paper</li>
        </ul>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" gutterBottom>
          Navigation
        </Typography>

        <ul>
          <li>Bottom Navigation</li>

          <li>Breadcrumbs</li>

          <li>Drawer</li>

          <li>Link</li>

          <li>Menu</li>

          <li>Pagination</li>

          <li>Speed Dial</li>

          <li>Stepper</li>

          <li>Tabs</li>
        </ul>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <PaletteSection />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" gutterBottom>
              Buttons
            </Typography>
            <ButtonSection />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" gutterBottom>
              Text Fields
            </Typography>
            <TextFieldSection />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" gutterBottom>
              Cards
            </Typography>
            <CardSection />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" gutterBottom>
              Typography
            </Typography>
            <TypographySection />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" gutterBottom>
              Alerts
            </Typography>
            <AlertSection />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PreviewGrid;
