import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import { loadThemeState, saveThemeState } from './localStorage';

const preloadedState = loadThemeState();

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
  preloadedState: preloadedState ? { theme: preloadedState } : undefined,
});

store.subscribe(() => {
  try {
    saveThemeState(store.getState().theme);
  } catch (e) {
    // Ignore localStorage errors (quota, etc.)
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
