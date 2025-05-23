import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTheme } from '@mui/material/styles';

const defaultMuiTheme = createTheme();

export interface ThemeState {
  palette: {
    primary: { main: string };
    secondary: { main: string };
    error: { main: string };
    warning: { main: string };
    info: { main: string };
    success: { main: string };
    mode: 'light' | 'dark';
  };
  typography: {
    fontFamily: string;
    fontSize: number;
  };
}

const initialState: ThemeState = {
  palette: {
    primary: { main: defaultMuiTheme.palette.primary.main },
    secondary: { main: defaultMuiTheme.palette.secondary.main },
    error: { main: defaultMuiTheme.palette.error.main },
    warning: { main: defaultMuiTheme.palette.warning.main },
    info: { main: defaultMuiTheme.palette.info.main },
    success: { main: defaultMuiTheme.palette.success.main },
    mode: 'light',
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 14,
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updatePrimaryColor: (state, action: PayloadAction<string>) => {
      state.palette.primary.main = action.payload;
    },
    updateSecondaryColor: (state, action: PayloadAction<string>) => {
      state.palette.secondary.main = action.payload;
    },
    updateErrorColor: (state, action: PayloadAction<string>) => {
      state.palette.error.main = action.payload;
    },
    updateWarningColor: (state, action: PayloadAction<string>) => {
      state.palette.warning.main = action.payload;
    },
    updateInfoColor: (state, action: PayloadAction<string>) => {
      state.palette.info.main = action.payload;
    },
    updateSuccessColor: (state, action: PayloadAction<string>) => {
      state.palette.success.main = action.payload;
    },
    updateMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.palette.mode = action.payload;
    },
    updateFontFamily: (state, action: PayloadAction<string>) => {
      state.typography.fontFamily = action.payload;
    },
    updateFontSize: (state, action: PayloadAction<number>) => {
      state.typography.fontSize = action.payload;
    },
    resetToDefaults: () => initialState,
  },
});

export const {
  updatePrimaryColor,
  updateSecondaryColor,
  updateErrorColor,
  updateWarningColor,
  updateInfoColor,
  updateSuccessColor,
  updateMode,
  updateFontFamily,
  updateFontSize,
  resetToDefaults,
} = themeSlice.actions;

export default themeSlice.reducer;
