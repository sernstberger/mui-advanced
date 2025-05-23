import type { ThemeState } from '../store/themeSlice';

export function generateThemeCode(
  palette: ThemeState['palette'],
  typography: ThemeState['typography']
): string {
  return `import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: '${palette.mode}',
    primary: { main: '${palette.primary.main}' },
    secondary: { main: '${palette.secondary.main}' },
    error: { main: '${palette.error.main}' },
    warning: { main: '${palette.warning.main}' },
    info: { main: '${palette.info.main}' },
    success: { main: '${palette.success.main}' },
  },
  typography: {
    fontFamily: '${typography.fontFamily}',
    fontSize: ${typography.fontSize},
  },
});

// Usage instructions:
// 1. Save this file as theme.ts in your project
// 2. Import and use with ThemeProvider:
// import { ThemeProvider } from '@mui/material/styles';
// import { theme } from './theme';
//
// <ThemeProvider theme={theme}>
//   <App />
// </ThemeProvider>
`;
}
