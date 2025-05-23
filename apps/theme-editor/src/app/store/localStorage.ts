import type { ThemeState } from './themeSlice';

const STORAGE_KEY = 'mui-theme-editor-theme';

export function loadThemeState(): ThemeState | undefined {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;
    return JSON.parse(serialized) as ThemeState;
  } catch (e) {
    // Corrupt or unavailable storage
    return undefined;
  }
}

export function saveThemeState(state: ThemeState) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    // Ignore write errors (quota, etc.)
  }
}
