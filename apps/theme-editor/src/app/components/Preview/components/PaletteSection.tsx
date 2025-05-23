import {
  Stack,
  Box,
  Typography,
  Grid,
  useTheme,
  getContrastRatio,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const PaletteSection = () => {
  const theme = useTheme();
  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Color Palette
      </Typography>
      <Grid container spacing={2}>
        {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map(
          (color) => {
            return (
              <div key={color}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  {color}
                </Typography>
                {[
                  { key: 'light', label: 'Light' },
                  { key: 'main', label: 'Main' },
                  { key: 'dark', label: 'Dark' },
                  // { key: 'contrastText', label: 'Contrast', textColor: 'black' },
                ].map((colorItem) => {
                  const roundToTwoDecimals = (value: number) => {
                    return Math.round(value * 100) / 100;
                  };
                  const contrastRatio = getContrastRatio(
                    theme.palette[color][colorItem.key],
                    theme.palette[color].contrastText
                  );
                  const roundedContrastRatio =
                    roundToTwoDecimals(contrastRatio);
                  const AAContrastRatio = 4.5;
                  const isAccessible = contrastRatio >= AAContrastRatio;
                  return (
                    <Box
                      key={colorItem.key}
                      sx={{
                        backgroundColor: `${color}.${colorItem.key}`,
                        color: theme.palette[color].contrastText,
                      }}
                    >
                      {colorItem.label}
                      <br />
                      {theme.palette[color][colorItem.key]}
                      <br />
                      {roundedContrastRatio}
                      {isAccessible ? <CheckIcon /> : <CloseIcon />}
                    </Box>
                  );
                })}
              </div>
            );
          }
        )}
      </Grid>
    </Stack>
  );
};

export default PaletteSection;
