import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ThemeEditor from './components/ThemeEditor';
import { useAppSelector } from './hooks/redux';

function ThemedApp() {
  const palette = useAppSelector((state) => state.theme.palette);
  const typography = useAppSelector((state) => state.theme.typography);
  const theme = createTheme({
    palette: {
      ...palette,
      primary: { main: palette.primary.main },
      secondary: { main: palette.secondary.main },
      error: { main: palette.error.main },
      warning: { main: palette.warning.main },
      info: { main: palette.info.main },
      success: { main: palette.success.main },
      mode: palette.mode,
    },
    typography: {
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeEditor />
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}

export default App;
