import { Grid, Box, BoxProps, Typography } from '@mui/material';
import ButtonSection from './components/ButtonSection';
import TextFieldSection from './components/TextFieldSection';
import CardSection from './components/CardSection';
import TypographySection from './components/TypographySection';
import ChipSection from './components/ChipSection';
import AlertSection from './components/AlertSection';
import PaletteSection from './components/PaletteSection';

import * as React from 'react';
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
// import GradientText from 'docs/src/components/typography/GradientText';
// import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
// import HeroContainer from 'docs/src/layouts/HeroContainer';

// function createLoading(sx: BoxProps['sx']) {
//   return function Loading() {
//     return (
//       <Box
//         sx={[
//           (theme) => ({
//             borderRadius: 1,
//             bgcolor: 'grey.100',
//             ...theme.applyDarkStyles({
//               bgcolor: 'primaryDark.800',
//             }),
//           }),
//           ...(Array.isArray(sx) ? sx : [sx]),
//         ]}
//       />
//     );
//   };
// }

// const TaskCard = dynamic(() => import('../showcase/TaskCard'), {
//   ssr: false,
//   loading: createLoading({ width: 360, height: 280 }),
// });
// const PlayerCard = dynamic(() => import('../showcase/PlayerCard'), {
//   ssr: false,
//   loading: createLoading({ width: 400, height: 134 }),
// });
// const ThemeToggleButton = dynamic(
//   () => import('../showcase/ThemeToggleButton'),
//   {
//     ssr: false,
//     loading: createLoading({ width: 360, height: 48 }),
//   }
// );
// const ThemeChip = dynamic(() => import('../showcase/ThemeChip'), {
//   ssr: false,
//   loading: createLoading({ width: 360, height: 24 }),
// });
// const ThemeTimeline = dynamic(() => import('../showcase/ThemeTimeline'), {
//   ssr: false,
//   loading: createLoading({ width: 400, height: 175 }),
// });
// const FolderTable = dynamic(() => import('../showcase/FolderTable'), {
//   ssr: false,
//   loading: createLoading({ width: 400, height: 294 }),
// });
// const ThemeDatePicker = dynamic(() => import('../showcase/ThemeDatePicker'), {
//   ssr: false,
//   loading: createLoading({ width: 360, height: 245 }),
// });
// const ThemeTabs = dynamic(() => import('../showcase/ThemeTabs'), {
//   ssr: false,
//   loading: createLoading({ width: { md: 360, xl: 400 }, height: 48 }),
// });
// const ThemeSlider = dynamic(() => import('../showcase/ThemeSlider'), {
//   ssr: false,
//   loading: createLoading({ width: 400, height: 104 }),
// });
// const ThemeAccordion = dynamic(() => import('../showcase/ThemeAccordion'), {
//   ssr: false,
//   loading: createLoading({ width: 360, height: 252 }),
// });
// const NotificationCard = dynamic(() => import('../showcase/NotificationCard'), {
//   ssr: false,
//   loading: createLoading({ width: 360, height: 98 }),
// });

export function Hero() {
  const globalTheme = useTheme();
  const isMdUp = useMediaQuery(globalTheme.breakpoints.up('md'));
  return (
    <React.Fragment>
      {isMdUp && (
        <Stack
          spacing={3}
          useFlexGap
          sx={{ '& > .MuiPaper-root': { maxWidth: 'none' } }}
        >
          <TaskCard />
          <ThemeChip />
          {/* <ThemeDatePicker /> */}
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
          {/* <ThemeTimeline /> */}
          <ThemeToggleButton />
          <ThemeSlider />
          <ThemeTabs />
          <PlayerCard />
          {/* <FolderTable /> */}
        </Stack>
      )}
    </React.Fragment>
  );
}

const PreviewGrid = () => {
  return (
    <div>
      <Hero />

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
          <Grid size={{ xs: 12, md: 6 }}>{/* <ChipSection /> */}</Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AlertSection />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PreviewGrid;
