import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ThemeEditor from './components/ThemeEditor';

const defaultTheme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <ThemeEditor />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
