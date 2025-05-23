import { ThemeFormData, ThemeFormSchema } from '../types/theme';

const STORAGE_KEY = 'mui-theme-editor-theme';

export function loadThemeState(): ThemeFormData | undefined {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;

    const parsed = JSON.parse(serialized);
    // Validate the stored data against our schema
    const validated = ThemeFormSchema.parse(parsed);
    return validated;
  } catch (e) {
    // Corrupt or unavailable storage, or validation failed
    console.warn('Failed to load or validate theme data from localStorage:', e);
    // Clear invalid data
    clearThemeState();
    return undefined;
  }
}

export function saveThemeState(state: ThemeFormData) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    // Ignore write errors (quota, etc.)
    console.warn('Failed to save theme data to localStorage:', e);
  }
}

export function clearThemeState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear theme data from localStorage:', e);
  }
}
